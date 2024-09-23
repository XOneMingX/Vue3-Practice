import { createRouter, createWebHistory } from 'vue-router'
import Cookies from 'js-cookie'

import HomeView from '../views/HomeView.vue'
import { isTokenValid } from '@/utility/TokenValidationUtil'
import LoginView from '@/views/LoginView.vue'

const authRoutes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/article/:id',
    name: 'Article',
    component: () => import('../views/ArticleView.vue')
  },
  {
    path: '/editArticle/:id?',
    name: 'EditArticle',
    component: () => import('../views/EditArticleView.vue')
  }
]

const publicRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...authRoutes.map((route) => ({ ...route, meta: { requiresAuth: true } })),
    ...publicRoutes
  ]
})

router.beforeEach((to, from) => {
  const token = Cookies.get('jwt')
  const isAuthenticated = isTokenValid(token)

  console.log('Navigating to:', to.name) // Debugging statement
  console.log('Matched routes:', to.matched) // Debugging statement

  if (to.matched.some((record) => record.meta.requiresAuth) && !isAuthenticated) {
    console.log('Redirecting to Login')
    return { name: 'Login' }
  }

  // Allow navigation
  return true
})

export default router
