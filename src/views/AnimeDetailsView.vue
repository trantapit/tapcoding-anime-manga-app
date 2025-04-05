<template>
  <div class="container mx-auto" v-if="anime">
    <div class="flex flex-col md:flex-row gap-8">
      <div class="md:w-1/3">
        <img
          :src="anime.images.jpg.large_image_url"
          :alt="anime.title"
          class="w-full rounded-lg shadow-lg"
        />
      </div>
      
      <div class="md:w-2/3">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          {{ anime.title }}
        </h1>
        
        <div class="flex flex-wrap gap-4 mb-6">
          <span class="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-full">
            {{ anime.type }}
          </span>
          <span class="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 rounded-full">
            {{ anime.status }}
          </span>
          <span class="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-100 rounded-full">
            {{ anime.episodes }} episodes
          </span>
          <span class="px-3 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-100 rounded-full">
            Score: {{ anime.score }}
          </span>
        </div>

        <div class="mb-6">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Synopsis</h2>
          <p class="text-gray-700 dark:text-gray-300">{{ anime.synopsis }}</p>
        </div>

        <div class="mb-6">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Information</h2>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <p class="text-gray-600 dark:text-gray-400">Aired</p>
              <p class="text-gray-900 dark:text-white">{{ anime.aired.string }}</p>
            </div>
            <div>
              <p class="text-gray-600 dark:text-gray-400">Duration</p>
              <p class="text-gray-900 dark:text-white">{{ anime.duration }}</p>
            </div>
            <div>
              <p class="text-gray-600 dark:text-gray-400">Rating</p>
              <p class="text-gray-900 dark:text-white">{{ anime.rating }}</p>
            </div>
            <div>
              <p class="text-gray-600 dark:text-gray-400">Studio</p>
              <p class="text-gray-900 dark:text-white">
                {{ anime.studios.map(s => s.name).join(', ') }}
              </p>
            </div>
          </div>
        </div>

        <div class="mb-6">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Genres</h2>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="genre in anime.genres"
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
            v-if="anime.trailer.url"
            :href="anime.trailer.url"
            target="_blank"
            class="btn btn-primary"
          >
            Watch Trailer
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
const anime = ref(null)
const loading = ref(true)
const error = ref(null)

const isInWishlist = computed(() => {
  return anime.value ? wishlistStore.items.some(item => item.mal_id === anime.value.mal_id) : false
})

const fetchAnimeDetails = async () => {
  loading.value = true
  error.value = null

  try {
    const response = await axios.get(`https://api.jikan.moe/v4/anime/${route.params.id}`)
    anime.value = response.data.data
  } catch (err) {
    error.value = 'An error occurred while fetching anime details. Please try again.'
    console.error(err)
  } finally {
    loading.value = false
  }
}

const toggleWishlist = () => {
  if (isInWishlist.value) {
    wishlistStore.removeItem(anime.value)
  } else {
    wishlistStore.addItem(anime.value)
  }
}

onMounted(fetchAnimeDetails)
</script> 