import { reactive } from 'vue'
import { defineStore } from 'pinia'
const storage = window.localStorage

export const useUserStore = defineStore('user', () => {
  const user = reactive(JSON.parse(storage.getItem('User') || '{}'))

  const funds = reactive(JSON.parse(storage.getItem('Funds') || '{"value": 0}'))

  const setFunds = value => {
    funds.value = value ? parseFloat(value) : null
    funds.updated_at = new Date().toISOString()
    storage.setItem('Funds', JSON.stringify(funds))
  }

  return { user, funds, setFunds }
})