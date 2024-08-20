import { defineStore } from 'pinia'

import useAuthAPI from '@/modules/auth/api/auth.api'

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    user: null,
    access_token: null,
    refresh_token: null,
  }),
  getters: {
    isAuthenticated() {
      return !!this.access_token
    },
  },
  actions: {
    async setTokens(access_token, refresh_token) {
      const authAPI = useAuthAPI()
      try {
        this.access_token = access_token
        this.refresh_token = refresh_token
        const user = await authAPI.getMe()
        this.user = user
        return user
      } catch (err) {
        this.logout()
        throw err
      }
    },
    async refreshTokens() {
      const authAPI = useAuthAPI()
      try {
        const res = await authAPI.refresh()
        return this.setTokens(res.access_token, res.refresh_token)
      } catch (error) {
        this.logout()
        throw error
      }
    },
    logout() {
      this.access_token = null
      this.refresh_token = null
      this.user = null
    },
  },
  persist: true,
})
