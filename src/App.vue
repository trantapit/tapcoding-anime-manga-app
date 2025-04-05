<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col">
    <Header />
    <main class="flex-grow w-full max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
</script> 