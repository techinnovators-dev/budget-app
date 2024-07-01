<script setup>
import { ref, computed, defineAsyncComponent } from 'vue'
import { useTransactionStore } from '@/stores/transaction'
import { useFormat } from '@/use/format'

const EditTransaction = defineAsyncComponent(() => import('@/components/Transaction/EditTransaction.vue'))
const DeleteTransaction = defineAsyncComponent(() => import('@/components/Transaction/DeleteTransaction.vue'))

const transactionStore = useTransactionStore()
const { commaNumber } = useFormat()

const headers = [
  {title: 'Name', key: 'name', searchable: true},
  {title: 'Value', key: 'value', searchable: false},
  {title: '', key: 'actions', sortable: false, searchable: false}
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
</script>

<template lang="pug">
v-container(fluid)
  v-card.mx-auto(width="400")
    v-card-text.pb-0
      v-data-table(
        :items="transactionStore.transactionsList",
        :headers="headers",
        :search="search"
      )
        template(#top)
          .d-flex.justify-space-between.mb-2
            .text-h6 Transactions
            v-btn(icon="mdi-plus", @click="openEditItem({})", size="small", color="primary", density="comfortable")
          v-text-field(placeholder="Search", v-model="search", prepend-inner-icon="mdi-magnify", density="compact")
        template(#item.value="{item}")
          .text-success(v-if="item.sign == 1") + {{ commaNumber(item.value) }}
          .text-error(v-else) - {{ commaNumber(item.value) }}
        template(#item.actions="{item}")
          .d-flex.justify-space-around
            v-btn(icon="mdi-pencil-outline", @click="openEditItem(item)", variant="text", size="x-small")
            v-btn(icon="mdi-trash-can-outline", @click="openDeleteItem(item)", variant="text", size="x-small")
        template(#no-data)
          .text-center No Transactions Created
          a.text-center(href="", @click.prevent="openEditItem({})") Create one
        template(#bottom, v-if="!transactionStore.transactionsList.length")

  v-dialog(v-model="showEditItem")
    edit-transaction.mx-auto(:item="selectedItem", @close="closeEditItem")

  v-dialog(v-model="showDeleteItem")
    delete-transaction.mx-auto(:item="selectedItem", @close="closeDeleteItem")
</template>
