<template>
  <div class="flex items-center justify-center h-screen bg-gray-100">
    <div class="bg-white p-8 rounded shadow-md w-full max-w-md">
      <h2 class="text-2xl mb-4 font-bold">Login</h2>
      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label>Email</label>
          <InputText v-model="email" class="w-full" />
        </div>
        <div class="mb-4">
          <label>Password</label>
          <Password v-model="password" class="w-full" toggleMask />
        </div>
        <Button label="Login" class="w-full" type="submit" />
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '@/services/authService'

const router = useRouter()
const email = ref('')
const password = ref('')

const handleLogin = async () => {
  try {
    const res = await login(email.value, password.value)
    localStorage.setItem('token', res.token.plainTextToken)
    router.push('/users')
  } catch (err) {
    alert('Login gagal')
  }
}
</script>
