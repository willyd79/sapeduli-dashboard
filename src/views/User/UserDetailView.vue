<template>
  <div class="p-4">
    <Card>
      <template #title>Detail Pengguna</template>
      <template #content>
        <p><strong>Nama:</strong> {{ user?.user_name }}</p>
        <p><strong>Email:</strong> {{ user?.user_email }}</p>
        <p><strong>Username:</strong> {{ user?.user_uname }}</p>
        <p><strong>Status:</strong> {{ user?.user_status }}</p>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { getUserById } from '@/services/userService'
import Card from 'primevue/card'

const route = useRoute()
const user = ref()

onMounted(async () => {
  const res = await getUserById(Number(route.params.id))
  if (res.status) {
    user.value = res.data
  }
})
</script>
