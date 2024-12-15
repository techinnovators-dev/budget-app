<script setup>
import { ref, defineAsyncComponent } from 'vue'
import { RouterView } from 'vue-router'
import Alert from '@/components/Alert.vue'
const navDrawer = ref(false)
</script>

<template lang="pug">
v-layout
  v-app-bar(elevation="2")
    v-app-bar-nav-icon(@click="navDrawer = !navDrawer")
    v-app-bar-title Budget App
  v-navigation-drawer(v-model="navDrawer")
    .d-flex.flex-column.justify-space-between.h-100
      v-list.mt-5(width="100%")
        v-list-item(:to="{name: 'budget'}", link, prepend-icon="mdi-cash-multiple", title="Budget")
        v-list-item(:to="{name: 'transactions'}", link, prepend-icon="mdi-swap-horizontal", title="Transactions")
      v-list.mt-5(width="100%")
        v-list-item(:to="{name: 'settings'}", link, prepend-icon="mdi-cog-outline", title="Settings")
  v-main.h-100
    router-view
  v-footer.justify-center.text-caption(app)
    v-icon(icon="mdi-copyright", start, size="x-small")
    | {{ new Date().getFullYear() }} Tech Innovators
  alert
</template>