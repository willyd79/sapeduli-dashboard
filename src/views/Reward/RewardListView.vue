<template>
  <div class="p-4">
    <Card>
      <template #title>Daftar Reward</template>
      <template #content>
        <DataTable :value="rewards" dataKey="id" responsiveLayout="scroll">
          <Column field="name" header="Nama Reward" />
          <Column field="description" header="Deskripsi" />
          <Column field="points" header="Poin" />
        </DataTable>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getAllRewards } from '@/services/rewardService'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Card from 'primevue/card'

const rewards = ref([])

onMounted(async () => {
  const res = await getAllRewards()
  if (res.status) {
    rewards.value = res.data
  }
})
</script>
