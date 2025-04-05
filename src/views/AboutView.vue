<template>
  <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-8">Welcome to Anime/Manga</h1>
    
    <div class="prose dark:prose-invert max-w-none">
      <p class="text-gray-600 dark:text-gray-300 mb-6">
        A web application for searching and managing anime and manga using the Jikan API (MyAnimeList).
      </p>

      <div class="flex flex-col sm:flex-row gap-8">
        <div class="w-full sm:w-1/2">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">## Tech Stack</h2>
          <ul class="text-gray-600 dark:text-gray-300 space-y-2 mb-6">
            <li>👉 Frontend Framework: <span class="font-bold text-blue-500">Vue 3 JS</span></li>
            <li>👉 State Management: <span class="font-bold text-blue-500">Pinia</span></li>
            <li>👉 Styling: <span class="font-bold text-blue-500">Tailwind CSS</span></li>
            <li>👉 Routing: <span class="font-bold text-blue-500">Vue Router</span></li>
            <li>👉 API Handling: <span class="font-bold text-blue-500">Axios</span></li>
            <li>👉 API Source: <span class="font-bold text-blue-500">Jikan API v4</span></li>
            <li>👉 Icons: <span class="font-bold text-blue-500">Heroicons</span></li>
          </ul>
        </div>

        <div class="w-full sm:w-1/2">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">## Features</h2> 
          <ul class="text-gray-600 dark:text-gray-300 space-y-2 mb-6">
            <li>👉 Search for anime and manga</li>
            <li>👉 Filter by type, status, and more</li>
            <li>👉 Add items to wishlist</li>
            <li>👉 View detailed info about anime and manga</li>
            <li>👉 Dark mode support</li>
            <li>👉 Responsive design</li>
            <li>👉 Infinite scroll</li>
          </ul>
        </div>
      </div>

      <div class="mt-8">
        <router-link 
          to="/" 
          class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800"
        >
          Start Exploring
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
// No additional script needed for this view
</script> 