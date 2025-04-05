<template>
  <footer class="bg-white dark:bg-gray-800 shadow-lg mt-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Main Footer Content -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <!-- Logo Section -->
        <div class="flex flex-col items-center md:items-start">
          <router-link to="/" class="flex items-center mb-4">
            <span class="text-2xl font-bold text-blue-600 dark:text-blue-400">Anime/Manga</span>
          </router-link>
          <p class="text-gray-600 dark:text-gray-400 text-sm text-center md:text-left">
            This website designed and developed by <span class="text-blue-600 dark:text-blue-400 font-bold">TapCoding</span>.
          </p>
        </div>

        <!-- Menu Section -->
        <div class="flex flex-col items-center">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Links</h3>
          <nav class="flex flex-col space-y-2">
            <router-link 
              v-for="item in navigationItems" 
              :key="item.name"
              :to="item.href"
              class="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
            >
              {{ item.name }}
            </router-link>
          </nav>
        </div>

        <!-- Social Links Section -->
        <div class="flex flex-col items-center">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Connect With Us</h3>
          <div class="flex space-x-4">
            <a 
              v-for="social in socialLinks" 
              :key="social.name"
              :href="social.url"
              target="_blank"
              rel="noopener noreferrer"
              class="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
              :aria-label="social.name"
            >
              <svg 
                v-if="social.name === 'Facebook'"
                class="h-6 w-6" 
                fill="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z"/>
              </svg>
              <svg 
                v-else-if="social.name === 'Instagram'"
                class="h-6 w-6" 
                fill="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.012-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              <svg 
                v-else-if="social.name === 'Email'"
                class="h-6 w-6" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <!-- Copyright Section -->
      <div class="border-t border-gray-200 dark:border-gray-700 pt-8">
        <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p class="text-gray-600 dark:text-gray-400 text-sm">
            © {{ new Date().getFullYear() }} Anime/Manga. All rights reserved.
          </p>
          <div class="flex space-x-6">
            <a 
              href="#" 
              class="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm"
            >
              Privacy Policy
            </a>
            <a 
              href="#" 
              class="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
const navigationItems = [
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
  { name: 'Wishlist', href: '/wishlist' }
]

const socialLinks = [
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/tran.c.tap'
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/trantap_it/'
  },
  {
    name: 'Email',
    url: 'mailto:trantap.it6491@gmail.com'
  }
]
</script> 