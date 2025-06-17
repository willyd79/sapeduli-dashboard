import { defineStore } from 'pinia'
import { login, logout, getCurrentUser } from '@/services/authServices'

interface User {
  id: number
  name: string
  email: string
  // tambah field lain sesuai respons dari API
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    token: localStorage.getItem('token') || ''
  }),
  actions: {
    async loginUser(payload: { email: string, password: string }) {
      try {
        const data = await login(payload)
        this.token = data.token
        localStorage.setItem('token', this.token)
      } catch (error) {
        throw error
      }
    },

    async fetchUser() {
      try {
        const res = await getCurrentUser()
        this.user = res.data
      } catch (error) {
        this.user = null
        throw error
      }
    },

    async logoutUser() {
      try {
        await logout()
      } catch (error) {
        // tetap logout lokal meski server error
        console.warn('Logout server gagal, lanjutkan logout lokal.')
      } finally {
        this.user = null
        this.token = ''
        localStorage.removeItem('token')
      }
    }
  }
})
