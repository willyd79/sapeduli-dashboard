<template>
  <div class="p-4">
    <Card>
      <template #title>Manajemen Pengguna</template>
      <template #content>
        <DataTable :value="users" dataKey="id" responsiveLayout="scroll">
          <Column field="user_name" header="Nama"></Column>
          <Column field="user_email" header="Email"></Column>
          <Column field="user_uname" header="Username"></Column>
          <Column field="user_status" header="Status"></Column>
        </DataTable>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getAllUsers } from '@/services/userService'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Card from 'primevue/card'

const users = ref([])

onMounted(async () => {
  const response = await getAllUsers()
  if (response.status) {
    users.value = response.data
  }
})
</script>
