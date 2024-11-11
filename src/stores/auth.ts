import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false as boolean
  }),
  actions: {
    setLoginState(isAuthenticated: boolean) {
      this.isAuthenticated = isAuthenticated
    }
  }
})
