<template>
  <h4 class="text-center border-b-3 border-[##0a0a0a] pb-3 text-lg font-semibold">{{ dataCriacaoQuiz }}</h4>
  <div class="flex justify-between items-center">
    <ul class="mt-4 list-disc ml-5">
      <li>Pontos: {{ pontos }}</li>
      <li>Acertos: {{ acertos }}</li>
      <li>Tempo total: {{ tempoSegundos }}</li>
    </ul>
    <ul>
      <li class="concept mt-[12px] text-[3em] italic mr-5 font-extrabold">{{ conceito }}</li>
    </ul>
  </div>
</template>
<script setup>
  defineProps({
    dataCriacaoQuiz: String,
    pontos: Number,
    acertos: Number,
    tempoSegundos: String,
    conceito: String,
  })
</script>