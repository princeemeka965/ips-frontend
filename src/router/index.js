import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
   {
      path: '/',
      name: '',
      component: () => import('../views/HomePage.vue')
    },
    {
      path: '/thank-you',
      name: 'ThankYou',
      component: () => import('../views/ThankYou.vue')
    }
  ]
})

export default router
