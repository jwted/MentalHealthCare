import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LandingPage from '@/views/LandingPage.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '',
      component: LandingPage
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      //meta: { requiresAuth: true},
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      //meta: { requiresAuth: true},
    },
    {
      path: '/users',
      name: '/users/{userId}',
      component: '',
      meta: { requiresAuth: true},
    },
    {
      path: '/badges',
      name: '',
      component: '',
      meta: { requiresAuth: true},
    },
    {
      path: '/badges/{badgeId}',
      name: '',
      component: '',
      meta: { requiresAuth: true},
    },
    {
      path: '/posts',
      name: '',
      component: '',
      meta: { requiresAuth: true},
    },
    {
      path: '/posts/{postsId}',
      name: '',
      component: '',
      meta: { requiresAuth: true},
    },
    {
      path: '/posts/{postsId}/comments',
      name: '',
      component: '',
      meta: { requiresAuth: true},
    },
    {
      path: '/posts/{postsId}/comments/{commentId}',
      name: '',
      component: '',
      meta: { requiresAuth: true},
    },
    {
      path: '/posts/{postsId}/like',
      name: '',
      component: '',
      meta: { requiresAuth: true},
    },
    {
      path: '/reports',
      name: '',
      component: '',
      meta: { requiresAuth: true},
    },
    {
      path: '/reports',
      name: '',
      component: '',
      meta: { requiresAuth: true},
    },
    {
      path: '/diary',
      name: '',
      component: '',
      meta: { requiresAuth: true},
    },
    {
      path: '/diary/{entryId}',
      name: '',
      component: '',
      meta: { requiresAuth: true},
    },
    {
      path: '/activities',
      name: '',
      component: '',
      meta: { requiresAuth: true},
    },
    {
      path: '/activities/{activityId}',
      name: '',
      component: '',
      meta: { requiresAuth: true},
    },
    {
      path: '/categories',
      name: '',
      component: '',
      meta: { requiresAuth: true},
    },{
      path: '/categories/{categoryId}',
      name: '',
      component: '',
      meta: { requiresAuth: true},
    },
    {
      path: '/objectives',
      name: '',
      component: '',
      meta: { requiresAuth: true},
    },
    {
      path: '/objectives/{objectiveId}',
      name: '',
      component: '',
      meta: { requiresAuth: true},
    },
    {
      path: '/resources',
      name: '',
      component: '',
      meta: { requiresAuth: true},
    },
    {
      path: '/resources/{resourceId}',
      name: '',
      component: '',
      meta: { requiresAuth: true},
    },
    {
      path: '',
      name: '',
      component: '',
      meta: { requiresAuth: true},
    },
    {
      path: '',
      name: '',
      component: '',
      meta: { requiresAuth: true},
    },
  ]
})

export default router
