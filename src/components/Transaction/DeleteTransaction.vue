<script setup>
import { useTransactionStore } from '@/stores/transaction'
import { useEvent } from '@/use/event'

const props = defineProps({
  item: {
    type: Object,
    default: () => ({})
  }
})

const event = useEvent()
const { deleteTransaction } = useTransactionStore()

const emit = defineEmits(['close'])

const close = () => emit('close')
const confirm = () => {
  try {
    deleteTransaction(props.item)
    event.success(`Transaction Deleted`)
    close()
  } catch (e) {
    event.error(e)
  }
}
</script>

<template lang="pug">
v-card(width="400")
  v-card-text.text-center
    .text-h6.mb-4 Are you sure you want to delete?
    .text-h5.font-weight-bold {{ item.name }}
  v-card-actions
    v-btn(text="No", @click="close")
    v-btn(text="Yes", @click="confirm")
</template>