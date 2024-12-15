import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import vuetify from 'vite-plugin-vuetify'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV == 'production' ? '/budget-app/' : '/',
  plugins: [
    vue(),
    vueDevTools(),
    vuetify(),
    VitePWA({
      injectRegister: 'auto'
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})