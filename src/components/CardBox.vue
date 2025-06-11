<template>
  <div class="p-4 bg-white rounded shadow text-center">
    <p class="text-gray-500 text-sm">{{ title }}</p>
    <p class="text-2xl font-bold text-gray-800">{{ value }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  value: number | string;
}>();
</script>
