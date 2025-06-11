<template>
  <DefaultLayout>
    <div class="p-6 space-y-6">
      <h2 class="text-2xl font-semibold">Dashboard Overview</h2>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <CardBox title="Total Users" :value="totalUsers" />
        <CardBox title="Total Rewards" :value="totalRewards" />
      </div>
    </div>
  </DefaultLayout>
</template>

<script setup lang="ts">
import DefaultLayout from '@/layout/DefaultLayout.vue';
import CardBox from '@/components/CardBox.vue';
import { ref, onMounted } from 'vue';
import { getUsers } from '@/services/userService';
import { getRewards } from '@/services/rewardService';

const totalUsers = ref(0);
const totalRewards = ref(0);

onMounted(async () => {
  const users = await getUsers();
  const rewards = await getRewards();
  totalUsers.value = users.length;
  totalRewards.value = rewards.length;
});
</script>
