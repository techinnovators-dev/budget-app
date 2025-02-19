<script setup>
import { ref, defineAsyncComponent } from 'vue'
import { useDisplay } from 'vuetify'
import { useTransactionStore } from '@/stores/transaction'
import { useFormat } from '@/use/format'
import dayjs from 'dayjs'

const EditTransaction = defineAsyncComponent(() => import('@/components/Transaction/EditTransaction.vue'))
const DeleteTransaction = defineAsyncComponent(() => import('@/components/Transaction/DeleteTransaction.vue'))

const transactionStore = useTransactionStore()
const { mobile } = useDisplay()
const { commaNumber } = useFormat()

const headers = [
  {title: 'Name', key: 'name', searchable: true},
  {title: 'Interval', key: 'interval'},
  {title: 'Start', key: 'start_date', searchable: false},
  {title: 'End', key: 'end_date', searchable: false},
  {title: 'Amount', key: 'value', searchable: false},
  {title: 'Actions', key: 'actions', sortable: false, searchable: false, align: 'end'}
]

const search = ref(null)

const selectedItem = ref({})
const showEditItem = ref(false)
const showDeleteItem = ref(false)

const openEditItem = item => {
  selectedItem.value = item
  showEditItem.value = true
}

const closeEditItem = () => {
  showEditItem.value = false
}

const openDeleteItem = item => {
  selectedItem.value = item
  showDeleteItem.value = true
}

const closeDeleteItem = () => {
  showDeleteItem.value = false
}

const getIntervalText = (item) => {
  if (!item.interval_value) return 'Once'
  let val = `Every ${item.interval_value} ${item.interval}`
  if (item.interval_value > 1) val += 's'
  return val
}
</script>

<template lang="pug">
v-container(fluid)
  //- Data Table
  template(v-if="!mobile")
    v-card(max-width="800", :class="mobile ? 'flat px-0 mx-0 elevation-0' : 'mx-auto'")
      v-card-text.p-2
        .d-flex.justify-space-between.mb-2
          .text-h6 Transactions
          v-btn(icon="mdi-plus", @click="openEditItem({})", size="small", color="primary")
        v-data-table(
          v-if="transactionStore.transactionsList.length",
          :items="transactionStore.transactionsList",
          :headers="headers",
          :search="search",
          :sort-by="[{key: 'name', order: 'asc'}]",
          no-data-text="No transactions match your search"
        )
          template(#top)
            v-text-field.my-2(placeholder="Search", v-model="search", prepend-inner-icon="mdi-magnify")
          template(#item.value="{item}")
            .text-success(v-if="item.sign == 1") + {{ commaNumber(item.value) }}
            .text-error(v-else) - {{ commaNumber(item.value) }}
          template(#item.interval="{item}")
            .text-capitalize {{ getIntervalText(item) }}
          template(#item.start_date="{item}")
            | {{ item.start_date ? dayjs(item.start_date).format('YYYY-MM-DD') : null }}
          template(#item.end_date="{item}")
            | {{ item.end_date ? dayjs(item.end_date).format('YYYY-MM-DD') : null }}
          template(#item.actions="{item}")
            .d-flex.justify-space-around
              v-btn(icon="mdi-pencil-outline", @click="openEditItem(item)", variant="text", size="small")
              v-btn(icon="mdi-trash-can-outline", @click="openDeleteItem(item)", variant="text", size="small")
          template(#bottom, v-if="!transactionStore.transactionsList.length")
        
        .text-center.py-4(v-else)
          div No Transactions Found
          a(href="", @click.prevent="openEditItem({})") Add one
  
  //- Mobile Cards
  template(v-else)
    
  
    v-data-iterator(
      v-if="transactionStore.transactionsList.length",
      :items="transactionStore.transactionsList",
      :search="search"
    )
      template(#header)
        .d-flex.justify-space-between.mt-4
          .text-h6 Transactions
          v-btn(icon="mdi-plus", @click="openEditItem({})", size="small", color="primary")
        v-text-field.mt-2.mb-6(v-if="transactionStore.transactionsList.length", placeholder="Search", v-model="search", prepend-inner-icon="mdi-magnify")
      template(#default="{ items }")
        template(v-for="({raw: item}, i) in items", :key="i")
          v-card.mb-4
            v-card-title.d-flex.justify-space-between
              .text-title {{ item.name }}
              div
                v-btn(icon="mdi-pencil-outline", @click="openEditItem(item)", variant="text", size="small")
                v-btn.ml-2(icon="mdi-trash-can-outline", @click="openDeleteItem(item)", variant="text", size="small")
            v-card-text
              v-row
                v-col
                  span.font-weight-bold Interval: 
                  span.text-capitalize {{ getIntervalText(item) }}
                v-col
                  span.font-weight-bold Amount: 
                  span.text-success(v-if="item.sign == 1") + {{ commaNumber(item.value) }}
                  span.text-error(v-else) - {{ commaNumber(item.value) }}
              v-row.mt-0
                v-col
                  span.font-weight-bold Start Date: 
                  span {{ item.start_date ? dayjs(item.start_date).format('YYYY-MM-DD') : null }}
                v-col
                  span.font-weight-bold End Date: 
                  span {{ item.end_date ? dayjs(item.end_date).format('YYYY-MM-DD') : null }}

    .text-center.py-4(v-else)
      div No Transactions Found
      a(href="", @click.prevent="openEditItem({})") Add one
  
  v-dialog(v-model="showEditItem", :fullscreen="mobile", :transition="mobile ? 'dialog-bottom-transition' : 'dialog-transition'")
    edit-transaction.mx-auto(:item="selectedItem", @close="closeEditItem", persistent)

  v-dialog(v-model="showDeleteItem")
    delete-transaction(:item="selectedItem", @close="closeDeleteItem", :class="mobile ? 'w-100' : 'mx-auto'")
</template>
