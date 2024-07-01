<script setup>
import { ref, computed, watch, defineAsyncComponent } from 'vue'
import { useRouter } from 'vue-router'
import { useTransactionStore } from '@/stores/transaction'
import { useUserStore } from '@/stores/user'
import { useFormat } from '@/use/format'
import dayjs from 'dayjs'

const userStore = useUserStore()
const transactionStore = useTransactionStore()
const router = useRouter()
const { commaNumber } = useFormat()

const EditTransaction = defineAsyncComponent(() => import('@/components/Transaction/EditTransaction.vue'))

// Current Funds
const fundsProxy = ref({})
watch(() => userStore.funds, newVal => fundsProxy.value = newVal, {immediate: true})
const lastUpdate = computed(() => userStore.funds?.updated_at ? dayjs(userStore.funds.updated_at).format('MMMM DD, YYYY') : null)
const updateFunds = () => userStore.setFunds(fundsProxy.value.value)

// Upcoming
const upcomingTransactions = computed(() => {
  const final = []
  let i = 0
  transactionStore.transactionsList.forEach(t => {
    const {id, name, value, sign} = t
    final.push({ day: dayjs().add(++i, 'day'), id, name, value, sign})
  })
  final.sort((a, b) => a.day.isSame(b.day, 'day') ? 0 : a.day.isBefore(b.day) ? -1 : 1)
  let balance = parseFloat(userStore.funds.value) || 0
  final.forEach(t => {
    balance += (t.value * t.sign)
    t.balance = balance
    t.day = t.day.toDate()
  })
  return final
})
const headers = [
  {title: 'Date', key: 'day'},
  {title: 'Name', key: 'name', sortable: false},
  {title: 'Amount', key: 'value', sortable: false},
  {title: 'Balance', key: 'balance', sortable: false}
]

// Budget
const budget = computed(() => {
  let min = upcomingTransactions.value[0]
  upcomingTransactions.value.forEach(t => {
    if (t.balance < min.balance) min = t
  })
  return min
})

// Add Transaction
const showAddTransaction = ref(false)

</script>

<template lang="pug">
v-container(fluid)
  v-row.mt-2
    v-col
      .text-h4 Your Budget: {{ commaNumber(budget?.balance) }}
      .text-body-1.mt-1 until {{ dayjs(budget?.day).format('ddd, MMMM DD, YYYY') }}
    v-col(cols="3")
      v-text-field(
        label="Current Funds", v-model="fundsProxy.value",
        prepend-icon="mdi-cash-multiple", @change="updateFunds",
        :hint="`Updated ${lastUpdate}`", :persistent-hint="!!lastUpdate",
        hide-details="auto", type="number")
  v-row
    v-col
      v-data-table(
        :items="upcomingTransactions",
        :headers="headers",
        :sort-by="[{key: 'day', order: 'asc'}]",
        sticky, density="compact"
      )
        template(#top)
          .text-h5.mb-2
            | Upcoming Transactions
            v-btn.ml-2(icon="mdi-plus", @click="showAddTransaction=true", size="small", variant="text")
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

  v-dialog(v-model="showAddTransaction", persistent)
    edit-transaction.mx-auto(:item="{}", @close="showAddTransaction = false")

</template>