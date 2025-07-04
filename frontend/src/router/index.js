import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/PlayerMobile.vue')
  },
  {
    path: '/programacao',
    name: 'Programacao',
    component: () => import('../views/Programacao.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('../views/Admin.vue')
  },
  {
    path: '/admin/programas',
    name: 'AdminProgramas',
    component: () => import('../views/admin/Programas.vue')
  },
  {
    path: '/admin/agendamentos',
    name: 'AdminAgendamentos',
    component: () => import('../views/admin/Agendamentos.vue')
  },
  {
    path: '/admin/playlists',
    name: 'AdminPlaylists',
    component: () => import('../views/admin/Playlists.vue')
  },
  {
    path: '/config',
    name: 'Config',
    component: () => import('../views/PlayerConfig.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router 