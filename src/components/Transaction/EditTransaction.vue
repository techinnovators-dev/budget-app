<script setup>
import { ref, watch } from 'vue'
import { useTransactionStore } from '@/stores/transaction'
import { useRules } from '@/use/rules'
import { useEvent } from '@/use/event'
import dayjs from 'dayjs'

const defaultItem = {
  id: null,
  name: null,
  sign: null,
  value: null,
  interval: null,
  interval_value: null,
  start_date: null,
  end_date: null
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

// Item
const item = ref(defaultItem)
const isRecurring = ref(false)
watch(() => props.item, newVal => {
  item.value = newVal.id ? newVal : defaultItem
  if (item.value.start_date) item.value.start_date = dayjs(item.value.start_date).toDate()
  if (item.value.end_date) item.value.end_date = dayjs(item.value.end_date).toDate()
  isRecurring.value = !!newVal.interval_value
}, {immediate: true})

// Form
const close = () => emit('close')
const form = ref()
const loading = ref(false)
const submit = async () => {
  const {valid} = await form.value?.validate()
  if (valid) {
    loading.value = true
    try {
      item.value.value = parseFloat(item.value.value)
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

// Intervals
watch(() => isRecurring.value, newVal => {
  if (!newVal) {
    item.value.interval = null
    item.value.interval_value = null
  } else if (!item.value.interval_value) {
    item.value.interval_value = 1
  }
})
const intervals = ref([
  {title: `Day`, value: 'day'},
  {title: `Week`, value: 'week'},
  {title: `Month`, value: 'month'},
  {title: `Year`, value: 'year'}
])
watch(() => item.value.interval_value, (newVal, oldVal) => {
  if (oldVal == 1 && newVal > 1) intervals.value.forEach(i => i.title = `${i.title}s`)
  else if (newVal == 1 && oldVal > 1) intervals.value.forEach(i => i.title = i.title.replace('s',''))
})

// Start Date
const minDate = ref(new Date())
minDate.value.setDate(minDate.value.getDate()-1)
const startDate = ref(null)
const showStartDatePicker = ref(false)
watch(() => item.value.start_date, newVal => {
  startDate.value = newVal ? dayjs(newVal).format('MMMM DD, YYYY') : null
  showStartDatePicker.value = false
}, {immediate: true})

// End Date
const endDate = ref(null)
const showEndDatePicker = ref(false)
watch(() => item.value.end_date, newVal => {
  endDate.value = newVal ? dayjs(newVal).format('MMMM DD, YYYY') : null
  showEndDatePicker.value = false
}, {immediate: true})

</script>

<template lang="pug">
v-card(max-width="600")
  v-toolbar
    v-toolbar-title Transaction
    v-btn.mr-4(icon="mdi-close", @click="close", variant="text")
  v-card-text
    v-form(ref="form", @submit.prevent="submit")
      v-row
        v-col
          v-text-field(placeholder="Name", v-model="item.name", prepend-icon="mdi-transcribe", :rules="[required]")
      v-row
        v-col.d-flex.align-center
          v-text-field(placeholder="Value", v-model="item.value", type="number", prepend-icon="mdi-cash-multiple", :rules="[required]")
      v-row
        v-col.d-flex.align-center.pb-0
          v-radio-group(v-model="item.sign", inline, prepend-icon="mdi-swap-horizontal", width="100%", :rules="[required]")
            v-radio(label="Incoming", :value="1")
            v-radio(label="Outgoing", :value="-1")
      v-row
        v-col.py-0
          v-checkbox(label="Recurring", v-model="isRecurring", prepend-icon="mdi-cash-sync")
          template.mt-1(v-if="isRecurring")
            v-text-field(label="Every", v-model="item.interval_value", type="number", :min="1", :rules="isRecurring ? [required] : null")
            v-select.mb-4(placeholder="Interval", v-model="item.interval", :items="intervals", :rules="isRecurring ? [required] : null")
      v-row
        v-col.pt-0
          v-text-field(:label="isRecurring ? 'Start Date' : ''", :placeholder="isRecurring ? '' : 'When'" v-model="startDate", read-only, @click:control="showStartDatePicker=true", prepend-icon="mdi-calendar-today", :rules="[required]", validate-on="lazy")
            v-menu(v-model="showStartDatePicker", :close-on-content-click="false", location-strategy="connected", target="parent")
              v-date-picker(v-model="item.start_date", :min="minDate", hide-header)
          v-text-field.mt-4(v-if="isRecurring", :label="`End Date${endDate ? '' : ' (optional)'}`", v-model="endDate", read-only, @click:control="showEndDatePicker=true", prepend-icon="mdi-calendar-remove")
            v-menu(v-model="showEndDatePicker", :close-on-content-click="false", location-strategy="connected", target="parent")
              v-date-picker(v-model="item.end_date", :min="minDate", hide-header)
      v-row
        v-col
          v-btn(text="Save", :loading="loading", type="submit", prepend-icon="mdi-content-save-outline", color="primary", block)

</template>