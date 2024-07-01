import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: () => ({ name: 'budget' })
    },
    {
      path: '/budget',
      name: 'budget',
      component: () => import('@/views/BudgetView.vue')
    },
    {
      path: '/transactions',
      name: 'transactions',
      component: () => import('@/views/TransactionsView.vue')
    }
  ]
})

export default router
