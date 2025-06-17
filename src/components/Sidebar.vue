<template>
  <aside
    :class="[
      'bg-white text-gray-800 w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform md:relative md:translate-x-0 transition duration-200 ease-in-out z-50 shadow-md',
      isOpen ? 'translate-x-0' : '-translate-x-full'
    ]"
  >
    <!-- Logo & Tombol Tutup -->
    <div class="flex justify-between items-center px-4 mb-4 md:hidden">
      <span class="font-bold text-xl text-green-600">Sapeduli</span>
      <button @click="$emit('close')">
        <i class="pi pi-times text-lg"></i>
      </button>
    </div>

    <!-- Menu Sidebar -->
    <nav class="flex flex-col space-y-1">
      <RouterLink
        to="/dashboard"
        class="flex items-center space-x-2 px-4 py-2 hover:bg-green-100 rounded"
        active-class="bg-green-100 font-semibold"
      >
        <i class="pi pi-home"></i>
        <span>Dashboard</span>
      </RouterLink>
      <RouterLink
        to="/users"
        class="flex items-center space-x-2 px-4 py-2 hover:bg-green-100 rounded"
        active-class="bg-green-100 font-semibold"
      >
        <i class="pi pi-users"></i>
        <span>Users</span>
      </RouterLink>
      <RouterLink
        to="/rewards"
        class="flex items-center space-x-2 px-4 py-2 hover:bg-green-100 rounded"
        active-class="bg-green-100 font-semibold"
      >
        <i class="pi pi-gift"></i>
        <span>Rewards</span>
      </RouterLink>
    </nav>
  </aside>
</template>

<script setup lang="ts">
defineProps<{
  isOpen: boolean
}>()
</script>
