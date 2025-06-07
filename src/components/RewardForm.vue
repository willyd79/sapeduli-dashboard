<template>
  <form @submit.prevent="handleSubmit" class="p-fluid">
    <div class="mb-4">
      <label>Nama Reward</label>
      <InputText v-model="form.reward_name" required />
    </div>

    <div class="mb-4">
      <label>Poin</label>
      <InputNumber v-model="form.reward_point" inputId="reward_point" required />
    </div>

    <div class="flex justify-end gap-2">
      <Button label="Batal" class="p-button-secondary" @click="$emit('cancel')" />
      <Button type="submit" label="Simpan" />
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { createReward, updateReward } from '@/services/rewardService';
import { Reward } from '@/types/Reward';
import { useToast } from 'primevue/usetoast';

const props = defineProps<{ reward: Reward | null }>();
const emit = defineEmits(['success', 'cancel']);

const toast = useToast();
const form = ref<Reward>({
  id: 0,
  reward_name: '',
  reward_point: 0
});

watch(
  () => props.reward,
  (newReward) => {
    if (newReward) {
      form.value = { ...newReward };
    } else {
      form.value = {
        id: 0,
        reward_name: '',
        reward_point: 0
      };
    }
  },
  { immediate: true }
);

const handleSubmit = async () => {
  try {
    if (form.value.id) {
      await updateReward(form.value.id, form.value);
      toast.add({ severity: 'success', summary: 'Sukses', detail: 'Reward diperbarui' });
    } else {
      await createReward(form.value);
      toast.add({ severity: 'success', summary: 'Sukses', detail: 'Reward ditambahkan' });
    }
    emit('success');
  } catch (error) {
    toast.add({ severity: 'error', summary: 'Gagal', detail: 'Gagal simpan reward' });
  }
};
</script>
