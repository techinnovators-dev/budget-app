<script setup>
import { ref } from 'vue'
import { RouterView } from 'vue-router'
const navDrawer = ref(false)
</script>

<template lang="pug">
v-layout
  v-app-bar
    v-app-bar-nav-icon(@click="navDrawer = !navDrawer")
    v-app-bar-title Budget App
  v-navigation-drawer(v-model="navDrawer")
    v-list
      v-list-item Test
  v-main.h-100
    router-view
  v-footer.justify-center.text-caption(app)
    v-icon(icon="mdi-copyright", start, size="x-small")
    | {{ new Date().getFullYear() }} Tech Innovators
</template>