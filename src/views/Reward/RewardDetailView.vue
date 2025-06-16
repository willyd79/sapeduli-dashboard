<template>
  <div class="p-4">
    <Card>
      <template #title>Detail Reward</template>
      <template #content>
        <p><strong>Nama:</strong> {{ reward?.name }}</p>
        <p><strong>Deskripsi:</strong> {{ reward?.description }}</p>
        <p><strong>Poin:</strong> {{ reward?.points }}</p>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getRewardById } from '@/services/rewardService'
import Card from 'primevue/card'

const route = useRoute()
const reward = ref()

onMounted(async () => {
  const res = await getRewardById(Number(route.params.id))
  if (res.status) {
    reward.value = res.data
  }
})
</script>
