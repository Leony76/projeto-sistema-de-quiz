<template>
  <div class="fixed bottom-2 left-1/2 -translate-x-1/2 text-center">
    <p class="text-sm">Tempo decorrido</p>
    <p :class="['text-md', time <= 60 ? 'text-green-200' : time <= 120 ? 'text-orange-500' : 'text-red-500']">{{ formattedTimer }}</p>
  </div>
</template>
<script setup>
  defineProps({
    time: Number,
    formattedTimer: String
  })
</script>