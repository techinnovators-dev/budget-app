<script setup>
import { ref, defineAsyncComponent } from 'vue'
import { RouterView } from 'vue-router'
import { useTheme } from 'vuetify'
import Alert from '@/components/Alert.vue'

// Theme
const theme = useTheme()
const toggleTheme = () => {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}

//Nav
const navDrawer = ref(false)

</script>

<template lang="pug">
v-layout
  v-app-bar(elevation="2")
    v-app-bar-nav-icon(@click="navDrawer = !navDrawer")
    v-app-bar-title Budget App
    v-btn(@click="toggleTheme") {{theme.global.name.value == 'dark' ? 'Light Mode' : 'Dark Mode'}}
  v-navigation-drawer(v-model="navDrawer")
    v-list.mt-5(width="100%")
      v-list-item(:to="{name: 'budget'}", link, prepend-icon="mdi-cash-multiple", title="Budget")
      v-list-item(:to="{name: 'transactions'}", link, prepend-icon="mdi-swap-horizontal", title="Transactions")
  v-main.h-100
    router-view
  v-footer.justify-center.text-caption(app)
    v-icon(icon="mdi-copyright", start, size="x-small")
    | {{ new Date().getFullYear() }} Tech Innovators
  alert
</template>