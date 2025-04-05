<template>
  <div class="w-full max-w-7xl mx-auto">
    <div class="w-full mb-8">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">Search Anime & Manga</h1>
      
      <div class="w-full flex flex-col md:flex-row gap-4 mb-6">
        <div class="flex gap-2 w-full sm:w-2/5">
          <!-- Reset Filters Button -->
          <button
            @click="resetFilters"
            class="px-4 py-3 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800"
          >
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Input keyword..."
            class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            @input="debounceSearch"
          />
        </div>
        <div class="flex flex-wrap gap-2 w-full sm:w-3/5">
          <!-- Search Type Select -->
          <select
            v-model="searchType"
            class="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            @change="handleSearchTypeChange"
          >
            <option v-for="type in searchTypes" :key="type.value" :value="type.value">
              {{ type.label }}
            </option>
          </select>

          <!-- Anime Type Select -->
          <select
            v-if="searchType === 'anime'"
            v-model="animeType"
            class="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            @change="search"
          >
            <option value="">All Types</option>
            <option v-for="type in animeTypes" :key="type.value" :value="type.value">
              {{ type.label }}
            </option>
          </select>

          <!-- Manga Type Select -->
          <select
            v-if="searchType === 'manga'"
            v-model="mangaType"
            class="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            @change="search"
          >
            <option value="">All Types</option>
            <option v-for="type in mangaTypes" :key="type.value" :value="type.value">
              {{ type.label }}
            </option>
          </select>

          <!-- Anime Status Select -->
          <select
            v-if="searchType === 'anime'"
            v-model="animeStatus"
            class="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            @change="search"
          >
            <option value="">All Status</option>
            <option v-for="status in animeStatuses" :key="status.value" :value="status.value">
              {{ status.label }}
            </option>
          </select>

          <!-- Manga Status Select -->
          <select
            v-if="searchType === 'manga'"
            v-model="mangaStatus"
            class="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            @change="search"
          >
            <option value="">All Status</option>
            <option v-for="status in mangaStatuses" :key="status.value" :value="status.value">
              {{ status.label }}
            </option>
          </select>

          <!-- Anime Rating Select -->
          <select
            v-if="searchType === 'anime'"
            v-model="animeRating"
            class="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            @change="search"
          >
            <option value="">All Ratings</option>
            <option v-for="rating in animeRatings" :key="rating.value" :value="rating.value">
              {{ rating.label }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <div v-if="loading && results.length === 0" class="flex justify-center items-center h-64">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>

    <div v-else-if="error" class="text-red-500 text-center">
      {{ error }}
    </div>

    <div v-else-if="results.length === 0" class="text-center py-12">
      <svg class="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
      </svg>
      <h3 class="mt-2 text-lg font-medium text-gray-900 dark:text-white">No results found</h3>
      <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Try adjusting your search or filters</p>
    </div>

    <div v-else>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div
          v-for="item in results"
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
                @click.stop="toggleWishlist(item)"
                class="p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                :class="[
                  isInWishlist(item)
                    ? 'bg-red-500 hover:bg-red-600 focus:ring-red-500'
                    : 'bg-blue-500 hover:bg-blue-600 focus:ring-blue-500'
                ]"
                aria-label="Toggle wishlist"
              >
                <svg 
                  v-if="isInWishlist(item)"
                  class="h-5 w-5 text-white" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
                <svg 
                  v-else
                  class="h-5 w-5 text-white" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
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
              <div v-if="searchType === 'anime'" class="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <svg class="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                </svg>
                <span v-if="item.episodes">{{ item.episodes }} {{ item.episodes === 1 ? 'Episode' : 'Episodes' }}</span>
                <span v-else>N/A</span>
              </div>
              <div v-if="searchType === 'manga'" class="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <svg class="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
                <span v-if="item.chapters">{{ item.chapters }} {{ item.chapters === 1 ? 'Chapter' : 'Chapters' }}</span>
                <span v-else>N/A</span>
              </div>

              <div v-if="searchType === 'anime'" class="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <svg class="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
                {{ item.year ? item.year : 'N/A' }}
              </div>
              <div v-if="searchType === 'manga'" class="flex items-center text-sm text-gray-500 dark:text-gray-400">
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

      <!-- Loading indicator for infinite scroll -->
      <div v-if="loading && results.length > 0" class="flex justify-center items-center py-8">
        <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>

      <!-- No more results message -->
      <div v-if="!hasMoreResults && results.length > 0" class="text-center py-8 text-gray-500 dark:text-gray-400">
        No more results to load
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useWishlistStore } from '@/stores/wishlist'
import axios from 'axios'
import { useRouter } from 'vue-router'

// Select options arrays
const searchTypes = [
  { value: 'anime', label: 'Anime' },
  { value: 'manga', label: 'Manga' }
]

const animeTypes = [
  { value: 'tv', label: 'TV' },
  { value: 'movie', label: 'Movie' },
  { value: 'ova', label: 'OVA' },
  { value: 'special', label: 'Special' },
  { value: 'ona', label: 'ONA' },
  { value: 'music', label: 'Music' },
  { value: 'cm', label: 'CM' },
  { value: 'pv', label: 'PV' },
  { value: 'tv_special', label: 'TV Special' }
]

const mangaTypes = [
  { value: 'manga', label: 'Manga' },
  { value: 'novel', label: 'Novel' },
  { value: 'lightnovel', label: 'Light Novel' },
  { value: 'oneshot', label: 'Oneshot' },
  { value: 'doujin', label: 'Doujin' },
  { value: 'manhwa', label: 'Manhwa' }
]

const animeStatuses = [
  { value: 'airing', label: 'Airing' },
  { value: 'complete', label: 'Complete' },
  { value: 'upcoming', label: 'Upcoming' }
]

const mangaStatuses = [
  { value: 'publishing', label: 'Publishing' },
  { value: 'complete', label: 'Complete' },
  { value: 'hiatus', label: 'Hiatus' },
  { value: 'discontinued', label: 'Discontinued' },
  { value: 'upcoming', label: 'Upcoming' }
]

const animeRatings = [
  { value: 'g', label: 'G - All Ages' },
  { value: 'pg', label: 'PG - Children' },
  { value: 'pg13', label: 'PG-13' },
  { value: 'r17', label: 'R - 17+' },
  { value: 'r', label: 'R+ - Mild Nudity' },
  { value: 'rx', label: 'Rx - Hentai' }
]

// Reactive state variables
const searchQuery = ref('')
const searchType = ref('anime')
const animeType = ref('')
const mangaType = ref('')
const animeStatus = ref('')
const mangaStatus = ref('')
const animeRating = ref('')
const loading = ref(false)
const error = ref(null)
const results = ref([])
const currentPage = ref(1)
const hasMoreResults = ref(true)
const wishlistStore = useWishlistStore()
const router = useRouter()

let searchTimeout = null // Stores the timeout ID for debouncing

/**
 * Debounces the search function to prevent too many API calls
 * Resets pagination and results when search query changes
 * Waits 500ms after the last input before triggering search
 */
const debounceSearch = () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    currentPage.value = 1
    results.value = []
    hasMoreResults.value = true
    search()
  }, 500)
}

/**
 * Fetches default anime list when no search query is present
 * Uses the Jikan API to get top-rated anime
 * Handles pagination and appends new results to existing ones
 * Updates hasMoreResults based on API pagination response
 */
const fetchDefaultAnime = async () => {
  loading.value = true
  error.value = null

  let apiUrl = 'https://api.jikan.moe/v4/anime'
  if (searchType.value === 'manga') {
    apiUrl = 'https://api.jikan.moe/v4/manga'
  }

  try {
    const response = await axios.get(apiUrl, {
      params: {
        limit: 8,
        page: currentPage.value,
        order_by: 'scored_by',
        sort: 'desc'
      }
    })
    
    // Append new results to existing ones for infinite scroll
    if (currentPage.value === 1) {
      results.value = response.data.data
    } else {
      results.value = [...results.value, ...response.data.data]
    }
    
    hasMoreResults.value = response.data.pagination.has_next_page
  } catch (err) {
    error.value = 'An error occurred while fetching anime. Please try again.'
    console.error(err)
  } finally {
    loading.value = false
  }
}

/**
 * Handles search type change
 * Resets filters and triggers new search
 */
const handleSearchTypeChange = () => {
  // Reset filters
  animeType.value = ''
  mangaType.value = ''
  animeStatus.value = ''
  mangaStatus.value = ''
  animeRating.value = ''
  
  // Reset pagination
  currentPage.value = 1
  results.value = []
  hasMoreResults.value = true
  
  // Trigger search
  search()
}

/**
 * Performs search based on current filters
 * Uses the Jikan API to search for anime or manga
 * Handles pagination and appends new results to existing ones
 * Updates hasMoreResults based on API pagination response
 */
const search = async () => {
  if (!searchQuery.value && !animeType.value && !mangaType.value && 
      !animeStatus.value && !mangaStatus.value && !animeRating.value) {
    await fetchDefaultAnime()
    return
  }

  loading.value = true
  error.value = null

  try {
    const params = {
      q: searchQuery.value,
      limit: 8,
      page: currentPage.value,
      order_by: 'scored_by',
      sort: 'desc'
    }

    // Add type filter based on search type
    if (searchType.value === 'anime' && animeType.value) {
      params.type = animeType.value
    } else if (searchType.value === 'manga' && mangaType.value) {
      params.type = mangaType.value
    }

    // Add status filter based on search type
    if (searchType.value === 'anime' && animeStatus.value) {
      params.status = animeStatus.value
    } else if (searchType.value === 'manga' && mangaStatus.value) {
      params.status = mangaStatus.value
    }

    // Add rating filter for anime
    if (searchType.value === 'anime' && animeRating.value) {
      params.rating = animeRating.value
    }

    const response = await axios.get(`https://api.jikan.moe/v4/${searchType.value}`, { params })
    
    if (currentPage.value === 1) {
      results.value = response.data.data
    } else {
      results.value = [...results.value, ...response.data.data]
    }
    
    hasMoreResults.value = response.data.pagination.has_next_page
  } catch (err) {
    error.value = 'An error occurred while searching. Please try again.'
    console.error(err)
  } finally {
    loading.value = false
  }
}

/**
 * Checks if an item is already in the wishlist
 * @param {Object} item - The anime/manga item to check
 * @returns {boolean} True if item is in wishlist, false otherwise
 */
const isInWishlist = (item) => {
  return wishlistStore.items.some(i => i.mal_id === item.mal_id)
}

/**
 * Toggles an item in the wishlist
 * Adds the item if it's not in the wishlist, removes it if it is
 * @param {Object} item - The anime/manga item to toggle
 */
const toggleWishlist = (item) => {
  if (isInWishlist(item)) {
    wishlistStore.removeItem(item)
  } else {
    item.media_type = searchType.value
    wishlistStore.addItem(item)
  }
}

/**
 * Handles infinite scroll functionality
 * Checks if user has scrolled near the bottom of the page
 * Triggers loading of more items when appropriate
 * Prevents multiple simultaneous loads
 */
const handleScroll = () => {
  if (loading.value || !hasMoreResults.value) return
  
  const scrollPosition = window.innerHeight + window.scrollY
  const documentHeight = document.documentElement.scrollHeight
  
  // Load more when user scrolls to 80% of the page
  if (scrollPosition >= documentHeight * 0.8) {
    currentPage.value++
    if (searchQuery.value) {
      search()
    } else {
      fetchDefaultAnime()
    }
  }
}

/**
 * Lifecycle hook that runs when component is mounted
 * Initializes the component with either search results from URL
 * or default anime list
 * Sets up scroll event listener for infinite scroll
 */
onMounted(async () => {
  // Initial search if there's a query in the URL
  const urlParams = new URLSearchParams(window.location.search)
  const query = urlParams.get('q')
  
  if (query) {
    searchQuery.value = query
    await search()
  } else {
    await fetchDefaultAnime()
  }
  
  window.addEventListener('scroll', handleScroll)
})

/**
 * Lifecycle hook that runs when component is unmounted
 * Cleans up the scroll event listener to prevent memory leaks
 */
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

/**
 * Navigates to the details page for a specific item
 * @param {Object} item - The anime/manga item to navigate to
 */
const navigateToDetails = (item) => {
  window.open(`/${searchType.value}/${item.mal_id}`, '_blank')
}

/**
 * Resets all filters to their default values and triggers a new search
 */
const resetFilters = () => {
  // Reset all filter values
  searchQuery.value = ''
  searchType.value = 'anime'
  animeType.value = ''
  mangaType.value = ''
  animeStatus.value = ''
  mangaStatus.value = ''
  animeRating.value = ''
  
  // Reset pagination
  currentPage.value = 1
  results.value = []
  hasMoreResults.value = true
  
  // Trigger new search with default values
  fetchDefaultAnime()
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