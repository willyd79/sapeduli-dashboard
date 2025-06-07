<template>
  <form @submit.prevent="handleSubmit" class="p-fluid">
    <div class="mb-4">
      <label>Nama</label>
      <InputText v-model="form.user_name" required />
    </div>

    <div class="mb-4">
      <label>Email</label>
      <InputText type="email" v-model="form.user_email" required />
    </div>

    <div class="mb-4">
      <label>Status</label>
      <Dropdown v-model="form.user_status" :options="['1', '2']" placeholder="Pilih Status" />
    </div>

    <div class="mb-4">
      <label>Role</label>
      <InputText v-model="form.role_id" />
    </div>

    <div class="flex justify-end gap-2">
      <Button label="Batal" class="p-button-secondary" @click="$emit('cancel')" />
      <Button type="submit" label="Simpan" />
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { createUser, updateUser } from '@/services/userService';
import { User } from '@/types/User';
import { useToast } from 'primevue/usetoast';

const props = defineProps<{ user: User | null }>();
const emit = defineEmits(['success', 'cancel']);

const toast = useToast();
const form = ref<User>({
  id: 0,
  user_name: '',
  user_email: '',
  user_status: '',
  role_id: ''
});

watch(
  () => props.user,
  (newUser) => {
    if (newUser) {
      form.value = { ...newUser };
    } else {
      form.value = {
        id: 0,
        user_name: '',
        user_email: '',
        user_status: '',
        role_id: ''
      };
    }
  },
  { immediate: true }
);

const handleSubmit = async () => {
  try {
    if (form.value.id) {
      await updateUser(form.value.id, form.value);
      toast.add({ severity: 'success', summary: 'Sukses', detail: 'User diperbarui' });
    } else {
      await createUser(form.value);
      toast.add({ severity: 'success', summary: 'Sukses', detail: 'User ditambahkan' });
    }
    emit('success');
  } catch (error) {
    toast.add({ severity: 'error', summary: 'Gagal', detail: 'Gagal simpan user' });
  }
};
</script>
