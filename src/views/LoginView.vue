<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-green-300">
    <div class="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
      <div class="text-center mb-6">
        <h1 class="text-4xl font-bold text-green-700 mb-2">Sapeduli</h1>
        <p class="text-gray-500">Silakan login untuk masuk ke dashboard</p>
      </div>
      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label for="email" class="block text-gray-700 font-semibold mb-1">Email</label>
          <InputText
            id="email"
            v-model="email"
            placeholder="Masukkan email anda"
            class="w-full"
          />
        </div>
        <div class="mb-6">
          <label for="password" class="block text-gray-700 font-semibold mb-1">Password</label>
          <Password
            id="password"
            v-model="password"
            toggleMask
            feedback="false"
            placeholder="Masukkan password"
            class="w-full"
          />
        </div>
        <Button type="submit" label="Login" class="w-full" />
      </form>
      <Message v-if="error" severity="error" class="mt-4">{{ error }}</Message>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { loginUser } from '@/services/userServices'

const email = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()

const handleLogin = async () => {
  try {
    const response = await loginUser({ user_email: email.value, password: password.value })

    if (response?.token?.plainTextToken) {
      localStorage.setItem('token', response.token.plainTextToken)
      localStorage.setItem('user', JSON.stringify(response.user))
      router.push('/dashboard')
    } else {
      error.value = 'Login gagal, data token tidak ditemukan.'
    }
  } catch (err: any) {
    error.value = err?.response?.data?.message || 'Gagal login. Silakan periksa kembali.'
  }
}
</script>

<style scoped>
/* Opsional tambahan styling jika butuh */
</style>
