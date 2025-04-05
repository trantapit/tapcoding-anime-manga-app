<template>
  <div class="container" v-if="manga">
    <div class="flex flex-col md:flex-row gap-8">
      <div class="md:w-1/3">
        <img
          :src="manga.images.jpg.large_image_url"
          :alt="manga.title"
          class="w-full rounded-lg shadow-lg"
        />
      </div>
      
      <div class="md:w-2/3">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          {{ manga.title }}
        </h1>
        
        <div class="flex flex-wrap gap-4 mb-6">
          <span class="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-full">
            {{ manga.type }}
          </span>
          <span class="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 rounded-full">
            {{ manga.status }}
          </span>
          <span class="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-100 rounded-full">
            {{ manga.chapters || '?' }} chapters
          </span>
          <span class="px-3 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-100 rounded-full">
            Score: {{ manga.score }}
          </span>
        </div>

        <div class="mb-6">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Synopsis</h2>
          <p class="text-gray-700 dark:text-gray-300">{{ manga.synopsis }}</p>
        </div>

        <div class="mb-6">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Information</h2>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <p class="text-gray-600 dark:text-gray-400">Published</p>
              <p class="text-gray-900 dark:text-white">{{ manga.published.string }}</p>
            </div>
            <div>
              <p class="text-gray-600 dark:text-gray-400">Volumes</p>
              <p class="text-gray-900 dark:text-white">{{ manga.volumes || '?' }}</p>
            </div>
            <div>
              <p class="text-gray-600 dark:text-gray-400">Authors</p>
              <p class="text-gray-900 dark:text-white">
                {{ manga.authors.map(a => a.name).join(', ') }}
              </p>
            </div>
            <div>
              <p class="text-gray-600 dark:text-gray-400">Serialization</p>
              <p class="text-gray-900 dark:text-white">
                {{ manga.serializations.map(s => s.name).join(', ') }}
              </p>
            </div>
          </div>
        </div>

        <div class="mb-6">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Genres</h2>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="genre in manga.genres"
              :key="genre.mal_id"
              class="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full"
            >
              {{ genre.name }}
            </span>
          </div>
        </div>

        <div class="flex gap-4">
          <button
            @click="toggleWishlist"
            class="btn"
            :class="isInWishlist ? 'btn-secondary' : 'btn-primary'"
          >
            {{ isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist' }}
          </button>
          <a
            v-if="manga.url"
            :href="manga.url"
            target="_blank"
            class="btn btn-primary"
          >
            View on MyAnimeList
          </a>
        </div>
      </div>
    </div>
  </div>

  <div v-else-if="loading" class="flex justify-center items-center h-64">
    <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>

  <div v-else-if="error" class="text-red-500 text-center">
    {{ error }}
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useWishlistStore } from '@/stores/wishlist'
import axios from 'axios'

const route = useRoute()
const wishlistStore = useWishlistStore()
const manga = ref(null)
const loading = ref(true)
const error = ref(null)

const isInWishlist = computed(() => {
  return manga.value ? wishlistStore.items.some(item => item.mal_id === manga.value.mal_id) : false
})

const fetchMangaDetails = async () => {
  loading.value = true
  error.value = null

  try {
    const response = await axios.get(`https://api.jikan.moe/v4/manga/${route.params.id}`)
    manga.value = response.data.data
  } catch (err) {
    error.value = 'An error occurred while fetching manga details. Please try again.'
    console.error(err)
  } finally {
    loading.value = false
  }
}

const toggleWishlist = () => {
  if (isInWishlist.value) {
    wishlistStore.removeItem(manga.value)
  } else {
    wishlistStore.addItem(manga.value)
  }
}

onMounted(fetchMangaDetails)
</script> 