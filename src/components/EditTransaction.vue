<script setup>
import { ref, reactive } from 'vue'

// Form Settings
import { required } from '@/plugins/formRules'
const formValid = ref(true)

// Transaction Details
const item = reactive({
  id: null,
  name: null,
  sign: null,
  value: null
})

const submit = () => {
  alert(JSON.stringify(item))
}
</script>

<template lang="pug">
v-card(max-width="300", elevation="4")
  v-card-title Transaction Details
  v-card-text
    v-form(v-model="formValid")
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
          v-btn(text="Save", type="submit", prepend-icon="mdi-content-save-outline", @click.prevent="submit", color="primary", block)

</template>