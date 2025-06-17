<template>
  <div class="flex h-screen overflow-hidden">
    <!-- Sidebar -->
    <Sidebar :is-open="sidebarOpen" @close="sidebarOpen = false" />

    <!-- Konten utama -->
    <div class="flex-1 flex flex-col bg-gray-100 min-h-screen">
      <!-- Topbar -->
      <Topbar @toggleSidebar="sidebarOpen = !sidebarOpen" />

      <!-- Main content -->
    <main class="p-4 md:p-6 mt-1 transition-all duration-300 w-full">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Sidebar from '@/components/Sidebar.vue'
import Topbar from '@/components/Topbar.vue'

const sidebarOpen = ref(false)
</script>
