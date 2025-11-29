<template>
  <div class="border-2 bg-[#121212] rounded-lg p-4 mb-4 flex gap-1 items-center">
    <div class="flex flex-col gap-3">
      <h1 class="text-2xl italic font-extrabold">Mais rápido que a luz!</h1>
      <h2 class="w-[80%]">Você completou um quiz em menos de 15 segundos, um Barry Allan!</h2>
    </div>
    <span><Zap size="55" class="text-[4em] shadow"/></span>
  </div>
</template>
<script setup>
  import { Zap } from 'lucide-vue-next';
</script>
<style scoped>
  .shadow {
    filter: drop-shadow(0 0 8px white);
  }
</style>
