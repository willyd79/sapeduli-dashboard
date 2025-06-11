<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 p-4">
    <Card class="w-full max-w-md">
      <template #title>Login</template>
      <template #content>
        <form @submit.prevent="handleLogin" class="space-y-4">
          <div>
            <label for="email" class="block mb-1">Email</label>
            <InputText id="email" v-model="email" class="w-full" />
          </div>
          <div>
            <label for="password" class="block mb-1">Password</label>
            <Password v-model="password" toggleMask feedback="false" class="w-full" inputId="password" />
          </div>
          <div>
            <Button type="submit" label="Login" icon="pi pi-sign-in" class="w-full" :loading="loading" />
          </div>
          <Message v-if="errorMessage" severity="error">{{ errorMessage }}</Message>
        </form>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { login } from '@/services/authService.ts';

const email = ref('');
const password = ref('');
const loading = ref(false);
const errorMessage = ref('');
const router = useRouter();

const handleLogin = async () => {
  loading.value = true;
  errorMessage.value = '';

  try {
    const res = await login({ email: email.value, password: password.value });

    if (res.status && res.token?.plainTextToken) {
      localStorage.setItem('access_token', res.token.plainTextToken);
      localStorage.setItem('user', JSON.stringify(res.user));
      router.push('/dashboard');
    } else {
      errorMessage.value = res.message || 'Login gagal.';
    }
  } catch (err: any) {
    errorMessage.value = err.response?.data?.message || 'Terjadi kesalahan saat login.';
  } finally {
    loading.value = false;
  }
};
</script>
