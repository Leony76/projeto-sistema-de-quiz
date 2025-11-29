<template>
  <div class="text-center mt-5 border-t-2 border-b-2 border-[#262626] w-full py-2">
    <h1 class="text-3xl">Pergunta Nº {{ currentQuestion + 1 }}</h1>
    <p><span class="text-gray-500">Nível:</span> <span :class="[questionsData[currentQuestion].dificuldade === 'Fácil' ? 'text-green-500' : questionsData[currentQuestion].dificuldade === 'Médio' ? 'text-orange-500' : 'text-red-500']">{{ questionsData[currentQuestion].dificuldade }}</span></p>
    <p>{{ questionsData[currentQuestion].enunciado }}</p>
  </div>
  <div class="flex flex-col gap-2 mt-6 w-full border-3 border-[#262626] rounded-xl p-2">
    <button v-for="(option, i) in options" :key="i" @click="emit('select', option)" :class="['p-3 cursor-pointer rounded-xl hover:opacity-80', selectedOption === option ? 'bg-white text-black font-semibold' : 'bg-[#262626] text-white']">{{ questionsData[currentQuestion][option] }}</button>
  </div>
</template>
<script setup>
  defineProps({
    currentQuestion: Number,
    questionsData: Array,
    options: Array,
    selectedOption: String
  });

  const emit = defineEmits(["select"]);
</script>
