import { defineStore } from 'pinia'

export const useLoaderStore = defineStore('loaderStore', {
  state: () => ({
    loading: false,
    message: '',
  }),
  actions: {
    start(message = 'Loading...') {
      this.loading = true
      this.message = message
    },
    stop() {
      this.loading = false
      this.message = ''
    },
  },
})
