<template>
  <div class="max-w-7xl mx-auto">
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">My Wishlist</h1>
      <div class="text-sm text-gray-500 dark:text-gray-400">
        {{ wishlistStore.items.length }} {{ wishlistStore.items.length === 1 ? 'item' : 'items' }}
      </div>
    </div>

    <div v-if="wishlistStore.items.length === 0" class="text-center py-12">
      <svg class="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
      </svg>
      <h3 class="mt-2 text-lg font-medium text-gray-900 dark:text-white">Your wishlist is empty</h3>
      <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Start adding your favorite anime and manga to your wishlist.</p>
      <div class="mt-6">
        <router-link 
          to="/" 
          class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800"
        >
          Browse Anime & Manga
        </router-link>
      </div>
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <div
        v-for="item in wishlistStore.items"
        :key="item.mal_id"
        class="item-card bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200 cursor-pointer"
        @click="navigateToDetails(item)"
      >
        <div class="relative">
          <img
            :src="item.images.jpg.image_url"
            :alt="item.title"
            class="w-full h-48 object-cover"
          />
          <div class="absolute top-2 right-2">
            <button
              @click.stop="wishlistStore.removeItem(item)"
              class="p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 bg-red-500 hover:bg-red-600 focus:ring-red-500"
              aria-label="Remove from wishlist"
            >
              <svg class="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </div>
        
        <div class="p-4">
          <h3 class="text-base font-semibold text-gray-900 dark:text-white mb-2 line-clamp-1">
            {{ item.title }}
          </h3>
          
          <div class="flex items-center space-x-2 mb-3">
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
              {{ item.type || 'N/A' }}
            </span>
            <span v-if="item.score" class="inline-flex items-center text-sm text-gray-500 dark:text-gray-400">
              <svg class="h-4 w-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.363 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.363-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
              {{ item.score }}
            </span>
          </div>

          <div class="space-y-2 mb-4">
            <div v-if="item.media_type === 'anime'" class="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <svg class="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
              </svg>
              <span v-if="item.episodes">{{ item.episodes }} {{ item.episodes === 1 ? 'Episode' : 'Episodes' }}</span>
              <span v-else>N/A</span>
            </div>
            <div v-if="item.media_type === 'manga'" class="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <svg class="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
              <span v-if="item.chapters">{{ item.chapters }} {{ item.chapters === 1 ? 'Chapter' : 'Chapters' }}</span>
              <span v-else>N/A</span>
            </div>
            <div v-if="item.media_type === 'anime'" class="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <svg class="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
              {{ item.year ? item.year : 'N/A' }}
            </div>
            <div v-if="item.media_type === 'manga'" class="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <svg class="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              {{ item.status ? item.status : 'N/A' }}
            </div>
          </div>

          <div class="flex justify-between items-center w-full">
            <span class="w-full inline-flex justify-center items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800">
              View Details
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useWishlistStore } from '@/stores/wishlist'
import { useRouter } from 'vue-router'

const wishlistStore = useWishlistStore()
const router = useRouter()

/**
 * Navigates to the details page for a specific item
 * @param {Object} item - The anime/manga item to navigate to
 */
const navigateToDetails = (item) => {
  router.push(`/${item.media_type === 'manga' ? 'manga' : 'anime'}/${item.mal_id}`)
}
</script>

<style scoped>
.item-card {
  transition: transform 0.2s ease-in-out;
}

.item-card:hover {
  transform: translateY(-2px);
}
</style> 