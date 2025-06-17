<template>
  <header
    class="bg-green-600 text-white flex items-center justify-between px-4 py-3 shadow-md fixed top-0 w-full z-40 md:relative md:w-auto md:px-6 md:py-4"
  >
    <!-- Hamburger -->
    <button class="md:hidden" @click="$emit('toggleSidebar')">
      <i class="pi pi-bars text-xl"></i>
    </button>

    <!-- Right Section -->
    <div class="flex-1 text-right">
      👋 Halo, <b>{{ username }}</b>
      <RouterLink to="/" @click="logout" class="ml-4 inline-flex items-center space-x-1">
        <i class="pi pi-sign-out"></i>
        <span>Logout</span>
      </RouterLink>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()

const username = localStorage.getItem('user_name') || 'Admin'

const logout = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('user_name')
  router.push('/login')
}
</script>
