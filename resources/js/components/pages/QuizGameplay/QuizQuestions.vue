<template>
  <a :href="dashboardRedirect" class="flex gap-2 bg-[#0A0A0A] text-white border-2 border-white font-semibold py-2 pl-4 pr-5 rounded-3xl transition-[.5] hover:text-black hover:bg-white cursor-pointer fixed top-5 left-5">
    <ArrowLeft/>
    <span>Voltar</span>
  </a>
  <div class="flex flex-col items-center justify-center w-full mq-quizgameplay-questions-container">
    <slot/>
  </div>
  <Timer
    :time="time"
    :formattedTimer="formattedTimer"
  />
</template>
<script setup>
  import Timer from './Timer.vue';
  import { ArrowLeft } from 'lucide-vue-next';

  defineProps({
    dashboardRedirect: String,
    time: Number,
    formattedTimer: String
  })
</script>