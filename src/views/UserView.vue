<template>
  <div class="p-4">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-bold">Manajemen User</h2>
      <Button label="Tambah User" icon="pi pi-plus" @click="showCreateForm" />
    </div>

    <DataTable :value="users" :loading="loading" dataKey="id">
      <Column field="user_name" header="Nama" />
      <Column field="user_email" header="Email" />
      <Column field="user_status" header="Status" />
      <Column field="role_id" header="Role" />
      <Column header="Aksi">
        <template #body="{ data }">
          <Button icon="pi pi-pencil" class="p-button-text" @click="editUser(data)" />
          <Button icon="pi pi-trash" class="p-button-text text-red-500" @click="deleteUser(data.id)" />
        </template>
      </Column>
    </DataTable>

    <Dialog v-model:visible="visible" modal header="Form User" :style="{ width: '400px' }">
      <UserForm :user="selectedUser" @success="handleSuccess" @cancel="visible = false" />
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getUsers, deleteUserById } from '@/services/userService';
import UserForm from '@/components/UserForm.vue';
import { User } from '@/types/User';
import { useToast } from 'primevue/usetoast';

const users = ref<User[]>([]);
const loading = ref(false);
const visible = ref(false);
const selectedUser = ref<User | null>(null);
const toast = useToast();

const loadUsers = async () => {
  loading.value = true;
  try {
    users.value = await getUsers();
  } finally {
    loading.value = false;
  }
};

const showCreateForm = () => {
  selectedUser.value = null;
  visible.value = true;
};

const editUser = (user: User) => {
  selectedUser.value = { ...user };
  visible.value = true;
};

const deleteUser = async (id: number) => {
  if (confirm('Yakin hapus user ini?')) {
    await deleteUserById(id);
    toast.add({ severity: 'success', summary: 'Sukses', detail: 'User dihapus' });
    await loadUsers();
  }
};

const handleSuccess = async () => {
  visible.value = false;
  await loadUsers();
};

onMounted(loadUsers);
</script>
