<template>
  <div class="flex justify-between items-center border-2 bg-[#121212] rounded-lg p-4 mb-4">
    <div class="flex flex-col gap-3">
      <h1 class="text-3xl italic font-extrabold">Top 1!</h1>
      <h2 class="w-[80%]">Você alcançou o top 1 no rank de melhores pontuações, AÍ SIM parabéns!</h2>
    </div>
    <span><img class="shadow mr-10 pr-2" :src="top1rank" alt="top1"></span>
  </div>
</template>
<script setup>
  import top1rank from '../../../icons/top1rank.svg';
</script>
<style scoped>
  .shadow {
    filter: drop-shadow(0 0 8px white);
  }
</style>