<script setup>
import { reactive, ref, onMounted } from 'vue'
import { useEvent } from '@/use/event'

const event = useEvent()

const showAlert = ref(false)

let alert = reactive({
  type: null,
  icon: null,
  title: null,
  text: null
})

const handleAlert = data => {
  alert = Object.assign({}, {})
  if (typeof data == 'string') {
    alert.text = data
    data = {}
  } else if (data.error) {
    console.error(data.error)
    data = {
      type: 'error',
      title: data.error.error || data.title || 'Error',
      text: data.error.message || data.error
    }
    alert.text = data?.text
  } else if (data.link) {
    alert.link = data.link
    if (!data.title && !data.titleHTML) {
      data.titleHTML = `<u>${data.text}</u>`
      data.text = null
    } else {
      data.titleHTML = data.titleHTML || `<u>${data.title}</u>`
    }
    if (!data.textHTML) data.textHTML = `<div width="100%" class="text-center text-caption">${data.text || 'click to open'}</div>`
  } else {
    alert.text = data.text
  }
  if (data.titleHTML) alert.titleHTML = data.titleHTML
  if (data.textHTML) alert.textHTML = data.textHTML
  else alert.title = data?.title
  alert.type = data?.type || 'success'
  alert.icon = data?.icon || '$' + (alert.type == 'error' ? 'warning' : alert.type)
  showAlert.value = true
  setTimeout(() => showAlert.value = false, data?.timeout || (alert?.type == 'success' ? 5000 : 8000))
}

const openAlertLink = () => {
  if (alert.link) {
    window.open(alert.link)
    showAlert.value = false
  }
}

onMounted(() => {
  event.on('alert', handleAlert)
})

</script>

<template lang="pug">
div
  v-fade-transition
    v-alert.mt-1.mx-auto(
      v-model="showAlert"
      :icon="alert.icon"
      :type="alert.type"
      @click="openAlertLink"
      closable
    )
      template(v-slot:title)
        div(:class="[alert.link ? 'cursor-pointer' : '']")
          span(v-if="alert.titleHTML" v-html="alert.titleHTML")
          span(v-else) {{ alert.title }}
      template(v-slot:text)
        div(:class="[alert.link ? 'cursor-pointer' : '']")
          span(v-if="alert.textHTML" v-html="alert.textHTML")
          span(v-else) {{ alert.text }}
</template>

<style scoped>
.v-alert {
  position: fixed;
  left: 50%;
  top: 50px;
  transform: translate(-50%, -50%);
  margin: 0 auto;
  z-index: 999999;
}
</style>