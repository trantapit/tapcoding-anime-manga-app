<template>
  <nav class="bg-white dark:bg-gray-800 shadow-lg sticky top-0 z-10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <!-- Logo and Desktop Navigation -->
        <div class="flex">
          <div class="flex-shrink-0 flex items-center">
            <router-link to="/" class="flex items-center">
              <span class="text-2xl font-bold text-blue-600 dark:text-blue-400">Anime/Manga</span>
            </router-link>
          </div>
          
          <!-- Desktop Navigation -->
          <div class="hidden sm:ml-20 sm:flex sm:space-x-8">
            <router-link 
              v-for="item in navigationItems" 
              :key="item.name"
              :to="item.href"
              class="inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors duration-200"
              :class="[
                $route.path === item.href
                  ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-b-2 hover:border-gray-300 dark:hover:border-gray-600'
              ]"
            >
              {{ item.name }}
            </router-link>
          </div>
        </div>

        <!-- Right side items -->
        <div class="flex items-center">
          <!-- Mobile menu button -->
          <div class="flex items-center sm:hidden">
            <button
              @click="isMobileMenuOpen = !isMobileMenuOpen"
              class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span class="sr-only">Open main menu</span>
              <Bars3Icon v-if="!isMobileMenuOpen" class="block h-6 w-6" />
              <XMarkIcon v-else class="block h-6 w-6" />
            </button>
          </div>

          <!-- Desktop right side items -->
          <div class="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
            <router-link 
              to="/wishlist" 
              class="inline-flex items-center px-3 py-2 text-sm font-medium"
              :class="[
                $route.path === '/wishlist'
                  ? 'text-blue-600 dark:text-blue-400 dark:border-blue-400'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
              ]"
            >
              <HeartIcon class="h-5 w-5 mr-1" />
              Wishlist
            </router-link>
            <a 
              href="https://github.com/trantapit/tapcoding-anime-manga-app"
              target="_blank"
              rel="noopener noreferrer" 
              class="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            >
              <svg class="h-5 w-5 mr-1" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/>
              </svg>
              GitHub
            </a>
            <button 
              @click="toggleDarkMode" 
              class="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
            >
              <SunIcon v-if="isDarkMode" class="h-5 w-5" />
              <MoonIcon v-else class="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile menu -->
    <div 
      v-show="isMobileMenuOpen" 
      class="sm:hidden"
      transition="transition ease-in-out duration-200"
    >
      <div class="pt-2 pb-3 space-y-1">
        <router-link
          v-for="item in navigationItems"
          :key="item.name"
          :to="item.href"
          class="block pl-3 pr-4 py-2 text-base font-medium transition-colors duration-200"
          :class="[
            $route.path === item.href
              ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50'
          ]"
          @click="isMobileMenuOpen = false"
        >
          {{ item.name }}
        </router-link>
        <router-link
          to="/wishlist"
          class="block pl-3 pr-4 py-2 text-base font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50"
          @click="isMobileMenuOpen = false"
        >
          <div class="flex items-center">
            <HeartIcon class="h-5 w-5 mr-2" />
            Wishlist
          </div>
        </router-link>
        <button
          @click="toggleDarkMode"
          class="w-full text-left pl-3 pr-4 py-2 text-base font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50"
        >
          <div class="flex items-center">
            <SunIcon v-if="isDarkMode" class="h-5 w-5 mr-2" />
            <MoonIcon v-else class="h-5 w-5 mr-2" />
            {{ isDarkMode ? 'Light Mode' : 'Dark Mode' }}
          </div>
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { 
  SunIcon, 
  MoonIcon, 
  Bars3Icon, 
  XMarkIcon,
  HeartIcon
} from '@heroicons/vue/24/outline'

const isDarkMode = ref(false)
const isMobileMenuOpen = ref(false)

const navigationItems = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' }
]

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
  document.documentElement.classList.toggle('dark')
  localStorage.setItem('darkMode', isDarkMode.value)
}

onMounted(() => {
  const savedDarkMode = localStorage.getItem('darkMode')
  if (savedDarkMode === 'true') {
    isDarkMode.value = true
    document.documentElement.classList.add('dark')
  }
})
</script> 