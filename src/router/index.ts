import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/gerar-charts',
    name: 'GenerateCharts',
    component: () => import('../views/GenerateCharts.vue')
  }
]

const router = createRouter({
  history: createWebHistory('/'),
  routes
})


export default router
