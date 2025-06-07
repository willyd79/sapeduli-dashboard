<template>
  <header class="bg-white shadow px-4 py-2 flex justify-between items-center">
    <h1 class="font-bold">Sapeduli Admin</h1>
    <Button label="Logout" @click="logout" severity="danger" />
  </header>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()

const logout = () => {
  localStorage.removeItem('token')
  router.push('/login')
}
</script>
