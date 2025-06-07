<template>
  <div class="p-4">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-bold">Manajemen Reward</h2>
      <Button label="Tambah Reward" icon="pi pi-plus" @click="showCreateForm" />
    </div>

    <DataTable :value="rewards" :loading="loading" dataKey="id">
      <Column field="reward_name" header="Nama Reward" />
      <Column field="reward_point" header="Poin" />
      <Column header="Aksi">
        <template #body="{ data }">
          <Button icon="pi pi-pencil" class="p-button-text" @click="editReward(data)" />
          <Button icon="pi pi-trash" class="p-button-text text-red-500" @click="deleteReward(data.id)" />
        </template>
      </Column>
    </DataTable>

    <Dialog v-model:visible="visible" modal header="Form Reward" :style="{ width: '400px' }">
      <RewardForm :reward="selectedReward" @success="handleSuccess" @cancel="visible = false" />
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getRewards, deleteRewardById } from '@/services/rewardService';
import RewardForm from '@/components/RewardForm.vue';
import { Reward } from '@/types/Reward';
import { useToast } from 'primevue/usetoast';

const rewards = ref<Reward[]>([]);
const loading = ref(false);
const visible = ref(false);
const selectedReward = ref<Reward | null>(null);
const toast = useToast();

const loadRewards = async () => {
  loading.value = true;
  try {
    rewards.value = await getRewards();
  } finally {
    loading.value = false;
  }
};

const showCreateForm = () => {
  selectedReward.value = null;
  visible.value = true;
};

const editReward = (reward: Reward) => {
  selectedReward.value = { ...reward };
  visible.value = true;
};

const deleteReward = async (id: number) => {
  if (confirm('Yakin hapus reward ini?')) {
    await deleteRewardById(id);
    toast.add({ severity: 'success', summary: 'Sukses', detail: 'Reward dihapus' });
    await loadRewards();
  }
};

const handleSuccess = async () => {
  visible.value = false;
  await loadRewards();
};

onMounted(loadRewards);
</script>
