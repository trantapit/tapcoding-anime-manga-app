import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue')
  },
  {
    path: '/wishlist',
    name: 'wishlist',
    component: () => import('@/views/WishlistView.vue')
  },
  {
    path: '/anime/:id',
    name: 'anime-details',
    component: () => import('@/views/AnimeDetailsView.vue')
  },
  {
    path: '/manga/:id',
    name: 'manga-details',
    component: () => import('@/views/MangaDetailsView.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/AboutView.vue')
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('@/views/ContactView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router 