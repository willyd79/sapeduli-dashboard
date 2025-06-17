<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-2xl font-semibold">Manajemen Pengguna</h2>
      <Button label="Tambah User" icon="pi pi-plus" @click="openCreateDialog" />
    </div>

    <DataTable :value="users" responsiveLayout="scroll">
      <Column field="user_name" header="Nama" />
      <Column field="user_email" header="Email" />
      <Column field="user_status" header="Status">
          <template #body="{ data }">
            <span
              :class="{
                'text-green-600 font-semibold': data.user_status == '1',
                'text-red-600 font-semibold': data.user_status != '1',
              }"
            >
              {{ data.user_status == '1' ? 'Aktif' : 'Nonaktif' }}
            </span>
          </template>
      </Column>
      <Column header="Aksi">
        <template #body="slotProps">
          <Button icon="pi pi-pencil" class="p-button-text" @click="editUser(slotProps.data)" />
          <Button icon="pi pi-trash" class="p-button-text p-button-danger" @click="deleteUserConfirm(slotProps.data.id)" />
        </template>
      </Column>
    </DataTable>

    <!-- Dialog Form Tambah/Edit -->
    <Dialog v-model:visible="isDialogOpen" header="Form User" :modal="true" :closable="false" class="w-[400px]">
      <div class="mb-4">
        <label class="block mb-1">Nama</label>
        <InputText v-model="form.user_name" class="w-full" />
      </div>
      <div class="mb-4">
        <label class="block mb-1">Email</label>
        <InputText v-model="form.user_email" class="w-full" />
      </div>
      <div class="mb-4">
        <label class="block mb-1">Password</label>
        <Password v-model="form.user_password" class="w-full" toggleMask />
      </div>
      <div class="flex justify-end gap-2">
        <Button label="Batal" severity="secondary" @click="closeDialog" />
        <Button label="Simpan" @click="saveUser" />
      </div>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getUsers, createUser, updateUser, deleteUser as removeUser } from '@/services/userServices';

const users = ref([]);
const isDialogOpen = ref(false);
const isEdit = ref(false);
const selectedUserId = ref<number | null>(null);
const form = ref({
  user_name: '',
  user_email: '',
  user_password: '',
  user_status: true
});

const fetchUsers = async () => {
  users.value = await getUsers();
};

const openCreateDialog = () => {
  isDialogOpen.value = true;
  isEdit.value = false;
  form.value = {
    user_name: '',
    user_email: '',
    user_password: '',
    user_status: true
  };
};

const closeDialog = () => {
  isDialogOpen.value = false;
};

const editUser = (user: any) => {
  isDialogOpen.value = true;
  isEdit.value = true;
  selectedUserId.value = user.id;
  form.value = {
    user_name: user.user_name,
    user_email: user.user_email,
    user_password: '',
    user_status: user.user_status
  };
};

const saveUser = async () => {
  if (isEdit.value && selectedUserId.value !== null) {
    await updateUser(selectedUserId.value, form.value);
  } else {
    await createUser(form.value);
  }
  isDialogOpen.value = false;
  fetchUsers();
};

const deleteUserConfirm = async (id: number) => {
  if (confirm('Yakin ingin menghapus user ini?')) {
    await removeUser(id);
    fetchUsers();
  }
};

const toggleStatus = async (user: any) => {
  user.user_status = !user.user_status;
  await updateUser(user.id, { user_status: user.user_status });
  fetchUsers();
};

onMounted(fetchUsers);
</script>
