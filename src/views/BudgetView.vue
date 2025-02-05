<script setup>
import { ref, computed, watch, defineAsyncComponent, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useDisplay } from 'vuetify'
import { useTransactionStore } from '@/stores/transaction'
import { useUserStore } from '@/stores/user'
import { useFormat } from '@/use/format'
import dayjs from 'dayjs'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
dayjs.extend(isSameOrAfter)

const userStore = useUserStore()
const transactionStore = useTransactionStore()
const router = useRouter()
const { mobile, md } = useDisplay()
const { commaNumber } = useFormat()

const EditTransaction = defineAsyncComponent(() => import('@/components/Transaction/EditTransaction.vue'))

// Current Funds
const fundsProxy = ref({})
onMounted(() => fundsProxy.value = {...userStore.funds})
// watch(() => userStore.funds, newVal => fundsProxy.value = newVal, {immediate: true})
const lastUpdate = computed(() => userStore.funds?.updated_at ? dayjs(userStore.funds.updated_at).format('MMMM DD, YYYY') : null)
const updateFunds = (focused) => {
  console.log(!focused, fundsProxy.value.value, userStore.funds.value)
  if (!focused && fundsProxy.value.value != userStore.funds.value) userStore.setFunds(fundsProxy.value.value)
}

// Upcoming
const today = ref(dayjs().startOf('day'))
const budgetDays = ref(60)
const lastDay = computed(() => today.value.add(parseInt(budgetDays.value || 0)+1, 'days').startOf('day'))
const upcomingTransactions = computed(() => {
  const final = []
  transactionStore.transactionsList.forEach(t => {
    if (t.id != 4) return
    let e = t.end_date ? dayjs(t.end_date) : null
    if (e && e.isBefore(today.value)) return // Transaction ended before today
    let s = dayjs(t.start_date).startOf('day')
    if (!t.interval_value && s.isBefore(today.value)) return // One time transaction was before today
    if (s.isAfter(lastDay.value, 'day')) return // Transaction starts after budget range
    if (t.interval_value) {
      let diff = Math.floor(s.diff(today.value, t.interval))
      if (diff > 0) {
        let ints = Math.floor(diff/t.interval_value)
        s = s.add(ints+t.interval_value, t.interval) // Get to the next itteration
      }
    }
    const {id, name, value, sign} = t
    while (s.isBefore(lastDay.value) && s.isSameOrAfter(today.value, 'day') && (!e || (e && s.isBefore(e)))) {
      final.push({ id: `${id}-${s.format('YYYY-MM-DD')}`, tansaction_id: id, name, value, sign, day: s})
      if (!t.interval_value) break
      s = s.add(t.interval_value, t.interval)
    }
  })
  final.sort((a, b) => a.day.isSame(b.day, 'day') ? 0 : a.day.isBefore(b.day) ? -1 : 1)
  return final
})
const upcomingCount = computed(() => upcomingTransactions.value.length)
const budgetedTransactions = computed(() => {
  let balance = parseFloat(userStore.funds.value) || 0
  const final = [...upcomingTransactions.value]
  for (let i = 0; i < upcomingCount.value; i++) {
    let x = final[i]
    balance += (x.value * x.sign)
    x.balance = balance
    if (typeof x.day.toDate === 'function') x.day = x.day.toDate()
    x.index = i
  }
  return final
})
const headers = [
  {title: 'Date', key: 'day'},
  {title: 'Name', key: 'name', sortable: false},
  {title: 'Amount', key: 'value', sortable: false},
  {title: 'Balance', key: 'balance', sortable: false}
]
const budget = computed(() => {
  let min = budgetedTransactions.value[0]
  budgetedTransactions.value.forEach(t => {
    if (t.balance < min.balance) min = t
  })
  let min2 = min ? budgetedTransactions.value[min.index+1] : null
  if (min2) {
    for (let i = min2.index; i < upcomingCount.value; i++) {
      let t = budgetedTransactions.value[i]
      if (t.balance < min2.balance) min2 = t
    }
  }
  return [min, min2]
})

// Add Transaction
const showAddTransaction = ref(false)

</script>

<template lang="pug">
v-container(fluid)
  v-row.mt-2
    v-col
      .text-h4.d-flex.align-center Budget: {{ commaNumber(budget[0]?.balance) }}
      .text-body-1.mt-1(v-if="!!budget[0]") until {{ dayjs(budget[0].day).format('ddd, MMMM DD, YYYY') }}
      .text-caption(v-if="budget[0] && budget[1] && budget[0].day != budget[1].day")
        | then 
        span.font-weight-bold {{ commaNumber(budget[1].balance) }}&nbsp;
        | until {{ dayjs(budget[1].day).format('ddd, MMMM DD, YYYY') }}
    v-col.d-flex.align-center(:cols="mobile ? 12 : md ? 4 : 3")
      v-text-field(
        label="Current Funds", v-model="fundsProxy.value", type="number", :min="1",
        prepend-icon="mdi-cash-multiple", @update:focused="updateFunds", density="default",
        :hint="lastUpdate ? `Updated ${lastUpdate}` : null", :persistent-hint="!!lastUpdate")
  v-row
    v-col
      v-data-table(
        :items="budgetedTransactions",
        :headers="headers",
        :sort-by="[{key: 'day', order: 'asc'}]",
        sticky, density="compact"
      )
        template(#top)
          v-row.pt-2.pl-2.mb-2
            v-col.d-flex.align-start
              .text-h5.mb-2
                | Upcoming Transactions
                v-btn.ml-2(icon="mdi-plus", @click="showAddTransaction=true", size="small", variant="text")
            v-col.d-flex.align-start(:cols="mobile ? 12 : md ? 4 : 3")
              v-text-field(label="Budget Days", v-model="budgetDays", type="number", prepend-icon="mdi-calendar-month")
        template(#item.day="{item}")
          | {{ dayjs(item.day).format('ddd, MMMM DD, YYYY')}}
        template(#item.value="{item}")
          .text-success(v-if="item.sign == 1") + {{ commaNumber(item.value) }}
          .text-error(v-else) - {{ commaNumber(item.value) }}
        template(#item.balance="{item}")
          span(:class="item.balance < 0 ? 'text-error' : null") {{ commaNumber(item.balance) }}
        template(#no-data)
          .text-center.py-2
            div Can't budget without any transactions!
            a(href="", @click.prevent="showAddTransaction=true") Add one

  v-dialog(v-model="showAddTransaction", persistent, :fullscreen="mobile", :transition="mobile ? 'dialog-bottom-transition' : 'dialog-transition'")
    edit-transaction.mx-auto(:item="{}", @close="showAddTransaction = false")

</template>