<script setup>
import { ref, watch, defineEmits } from 'vue'
import { useTransactionStore } from '@/stores/transaction'
import { useRules } from '@/use/rules'
import { useEvent } from '@/use/event'

const defaultItem = {
  id: null,
  name: null,
  sign: null,
  value: null
}

const props = defineProps({
  item: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['close'])

const { editTransaction, addTransaction } = useTransactionStore()
const { required } = useRules()
const event = useEvent()

const item = ref({})

watch(() => props.item, newVal => item.value = newVal, {immediate: true})

const close = () => emit('close')

const form = ref()
const formValid = ref(null)
const loading = ref(false)
const submit = async () => {
  const {valid} = await form.value?.validate()
  if (valid) {
    loading.value = true
    try {
      if (item.value.id) {
        editTransaction(item.value)
      } else {
        addTransaction(item.value)
      }
      event.success(`Transaction Saved`)
      close()
    } catch (e) {
      event.error(e)
    }
    loading.value = false
  }
}
</script>

<template lang="pug">
v-card(max-width="300")
  v-toolbar
    v-toolbar-title Transaction
    v-btn(icon="mdi-close", @click="close", variant="text")
  v-card-text
    v-form(ref="form", @submit.prevent="submit")
      v-row
        v-col
          v-text-field(placeholder="Name", v-model="item.name", prepend-icon="mdi-transcribe", density="comfortable", :rules="[required]", hide-details="auto")
      v-row
        v-col.d-flex.align-center
          v-text-field(placeholder="Value", v-model="item.value", type="number", prepend-icon="mdi-cash-multiple", density="comfortable", :rules="[required]", hide-details="auto")
      v-row
        v-col.d-flex.align-center
          v-radio-group(v-model="item.sign", inline, prepend-icon="mdi-swap-horizontal", density="comfortable", width="100%", :rules="[required]", hide-details="auto")
            v-radio(label="Incoming", :value="1")
            v-radio(label="Outgoing", :value="-1")
      v-row
        v-col
          v-btn(text="Save", :loading="loading", type="submit", prepend-icon="mdi-content-save-outline", color="primary", block)

</template>