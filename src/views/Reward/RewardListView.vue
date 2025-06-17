<template>
  <div class="p-6 space-y-4">
    <div class="flex justify-between items-center">
      <h2 class="text-2xl font-semibold">Manajemen Reward</h2>
      <Button label="Tambah Reward" icon="pi pi-plus" @click="openNew" />
    </div>

    <Card>
      <template #title>Daftar Reward</template>
      <template #content>
        <DataTable :value="rewards" dataKey="id" responsiveLayout="scroll">
          <Column field="reward_name" header="Nama Reward" />
          <Column field="reward_description" header="Deskripsi" />
          <Column field="reward_point" header="Poin" />
          <Column header="Status">
            <template #body="{ data }">
              <Tag
                :value="data.reward_status === 1 ? 'Aktif' : 'Nonaktif'"
                :severity="data.reward_status === 1 ? 'success' : 'danger'"
              />
            </template>
          </Column>
          <Column header="Aksi" style="min-width: 150px">
            <template #body="{ data }">
              <Button icon="pi pi-pencil" class="mr-2" @click="editReward(data)" />
              <Button icon="pi pi-trash" severity="danger" @click="confirmDeleteReward(data.id)" />
            </template>
          </Column>
        </DataTable>
      </template>
    </Card>

    <!-- Dialog Tambah/Edit -->
    <Dialog v-model:visible="dialogVisible" header="Form Reward" :modal="true" class="w-[400px]">
      <div class="space-y-4">
        <InputText v-model="form.reward_name" placeholder="Nama Reward" class="w-full" />
        <InputText v-model="form.reward_description" placeholder="Deskripsi" class="w-full" />
        <InputNumber v-model="form.reward_point" placeholder="Poin" class="w-full" />
        <Dropdown
          v-model="form.reward_status"
          :options="[
            { label: 'Aktif', value: 1 },
            { label: 'Nonaktif', value: 0 }
          ]"
          placeholder="Pilih Status"
          class="w-full"
        />
        <div class="flex justify-end space-x-2">
          <Button label="Batal" severity="secondary" @click="dialogVisible = false" />
          <Button label="Simpan" @click="saveReward" />
        </div>
      </div>
    </Dialog>

    <!-- Konfirmasi Hapus -->
    <ConfirmDialog />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getRewards, createReward, updateReward, deleteRewardById } from '@/services/rewardServices'

import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import Dropdown from 'primevue/dropdown'
import Tag from 'primevue/tag'
import Card from 'primevue/card'
import ConfirmDialog from 'primevue/confirmdialog'
import { useConfirm } from 'primevue/useconfirm'
import { useToast } from 'primevue/usetoast'

const rewards = ref<any[]>([])
const dialogVisible = ref(false)
const form = ref({
  id: null,
  reward_name: '',
  reward_description: '',
  reward_point: 0,
  reward_status: 1
})

const confirm = useConfirm()
const toast = useToast()

const loadRewards = async () => {
  const res = await getRewards()
  if (res.status) {
    rewards.value = res.data
  }
}

const openNew = () => {
  form.value = {
    id: null,
    reward_name: '',
    reward_description: '',
    reward_point: 0,
    reward_status: 1
  }
  dialogVisible.value = true
}

const saveReward = async () => {
  if (form.value.id) {
    await updateReward(form.value.id, form.value)
    toast.add({ severity: 'success', summary: 'Berhasil', detail: 'Reward diperbarui', life: 3000 })
  } else {
    await createReward(form.value)
    toast.add({ severity: 'success', summary: 'Berhasil', detail: 'Reward ditambahkan', life: 3000 })
  }
  dialogVisible.value = false
  await loadRewards()
}

const editReward = (reward: any) => {
  form.value = { ...reward }
  dialogVisible.value = true
}

const confirmDeleteReward = (id: number) => {
  confirm.require({
    message: 'Apakah Anda yakin ingin menghapus reward ini?',
    header: 'Konfirmasi',
    icon: 'pi pi-exclamation-triangle',
    accept: async () => {
      await deleteRewardById(id)
      await loadRewards()
      toast.add({ severity: 'success', summary: 'Dihapus', detail: 'Reward berhasil dihapus', life: 3000 })
    }
  })
}

onMounted(loadRewards)
</script>
