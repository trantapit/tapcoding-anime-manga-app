import { defineStore } from 'pinia'

export const useWishlistStore = defineStore('wishlist', {
  state: () => ({
    items: JSON.parse(localStorage.getItem('wishlist')) || []
  }),

  actions: {
    addItem(item) {
      if (!this.items.some(i => i.mal_id === item.mal_id)) {
        this.items.push(item)
        this.saveToLocalStorage()
      }
    },

    removeItem(item) {
      this.items = this.items.filter(i => i.mal_id !== item.mal_id)
      this.saveToLocalStorage()
    },

    saveToLocalStorage() {
      localStorage.setItem('wishlist', JSON.stringify(this.items))
    }
  }
}) 