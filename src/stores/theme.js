import { ref } from 'vue'
import { defineStore } from 'pinia'
const storage = window.localStorage

export const useThemeStore = defineStore('theme', () => {
  const themes = [
    {
      title: 'Light', value: 'light'
    },
    {
      title: 'Dark', value: 'dark'
    },
    {
      title: 'Custom 1', value: 'custom-1'
    },
    {
      title: 'Custom 2', value: 'custom-2'
    }
  ]

  const theme = ref(storage.getItem('theme'))
  const setTheme = (theme) => {
    if (!theme) storage.removeItem('theme')
    storage.setItem('theme', theme)
  }

  return { themes, theme, setTheme }
})
