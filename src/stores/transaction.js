import { reactive, computed } from 'vue'
import { defineStore } from 'pinia'
const storage = window.localStorage

export const useTransactionStore = defineStore('transaction', () => {

  const transactions = reactive(JSON.parse(storage.getItem('Transactions') || '{}'))
  const ids = computed(() => Object.keys(transactions))
  const transactionsList = computed(() => ids.value.map(i => transactions[i]))

  const save = () => storage.setItem('Transactions', JSON.stringify(transactions))

  const addTransaction = t => {
    t.created_at = new Date().toISOString()
    t.updated_at = t.created_at
    let id = 0
    ids.value.forEach(i => i > id ? id = i : null)
    id++
    t.id = id
    transactions[id] = JSON.parse(JSON.stringify(t))
    save()
  }
  const editTransaction = t => {
    t.updated_at = new Date().toISOString()
    transactions[t.id] = t
    save()
  }

  const deleteTransaction = t => {
    delete transactions[t.id]
    save()
  }

  return { transactions, transactionsList, addTransaction, editTransaction, deleteTransaction }
})
