import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/accounts',
  },
  {
    path: '/accounts',
    name: 'Accounts',
    component: () => import('../views/Accounts.vue')
  },
  {
    path: '/operdays',
    name: 'Operdays',
    component: () => import('../views/Operdays.vue')
  },
  {
    path: '/operations',
    name: 'Operations',
    component: () => import('../views/Operations.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
