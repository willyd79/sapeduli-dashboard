<template>
    <div class="p-6 space-y-6">
      <h2 class="text-2xl font-semibold text-gray-700">Dashboard Overview</h2>

      <!-- Statistik -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <CardBox title="Total Users" :value="totalUsers" icon="pi pi-users" />
        <CardBox title="Total Rewards" :value="totalRewards" icon="pi pi-gift" />
        <CardBox title="Active Users" :value="activeUsers" icon="pi pi-user-check" />
        <CardBox title="Inactive Users" :value="inactiveUsers" icon="pi pi-user-minus" />
      </div>

      <!-- Ringkasan Reward Teratas -->
      <div>
        <h3 class="text-xl font-semibold mb-3">Top Rewards</h3>
        <ul class="bg-white shadow rounded divide-y">
          <li
            v-for="reward in topRewards"
            :key="reward.id"
            class="p-4 flex justify-between items-center hover:bg-gray-50"
          >
            <span class="font-medium">{{ reward.reward_name }}</span>
            <span class="text-gray-500">{{ reward.reward_point }} pts</span>
          </li>
        </ul>
      </div>
    </div>
</template>

<script setup lang="ts">
import CardBox from '@/components/CardBox.vue';
import { ref, onMounted } from 'vue';
import { getUsers } from '@/services/userServices';
import { getRewards } from '@/services/rewardServices';

const totalUsers = ref(0);
const activeUsers = ref(0);
const inactiveUsers = ref(0);
const totalRewards = ref(0);
const topRewards = ref<any[]>([]);

onMounted(async () => {
  const users = await getUsers();
  totalUsers.value = users.length;
  activeUsers.value = users.filter((u: any) => u.user_status === '1').length;
  inactiveUsers.value = users.filter((u: any) => u.user_status === '0').length;

  const rewards = await getRewards();
  totalRewards.value = rewards.length;

  // Top 5 reward berdasarkan poin
  topRewards.value = rewards.sort((a: any, b: any) => b.reward_point - a.reward_point).slice(0, 5);
});
</script>
