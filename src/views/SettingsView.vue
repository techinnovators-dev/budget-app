<script setup>
import { useTheme } from 'vuetify'
import { useThemeStore } from '@/stores/theme'
const theme = useTheme()
const tab = defineModel()

const themeStore = useThemeStore()

const toggleTheme = (th) => {
  themeStore.setTheme(th.value)
  theme.global.name.value = th.value
}
</script>

<template lang="pug">
v-container(fluid)
  v-row.mt-2
    v-col
      v-tabs(align-tabs="center" v-model="tab")
        v-tab(value="appearance") Appearance
        v-tab(value="advanced") Advanced
      v-tabs-window(v-model="tab")
        v-tabs-window-item(value="appearance")
          v-container
            v-row.mt-2.text-center
              v-col(cols="12" sm="6" md="4" lg="3" @click="toggleTheme(theme)" v-for="theme in themeStore.themes")
                v-card
                  v-card-text
                    .d-flex
                      v-icon(icon="mdi-brightness-4" size="40" v-if="theme.value == 'dark'").mr-4
                      v-icon(icon="mdi-brightness-6" size="40" v-else-if="theme.value == 'light'").mr-4
                      .mr-4.rounded-circle(style="width: 40px;height: 40px; background: #1867C0;" v-else)
                      h5.my-auto.mx-0.text-title {{ theme.title }}
</template>