<template>
  <div>
    <QuizOnlineLogo/>
    <div class="mt-5 border-t-2 border-b-2 border-[#262626] w-full py-2">
      <h1 class="text-2xl font-semibold text-center">Parabéns por completar o Quiz!</h1>
      <div class="flex justify-between items-center px-6 ">
        <ul class="list-disc">
          <li class="flex items-center gap-1"><span class="mr-1">-</span> Acertos totais: <span :class="['text-xl', rightAnsweredQuestions < 5 ? 'text-red-500' : rightAnsweredQuestions < 8 ? 'text-orange-500' : 'text-green-500']">{{ rightAnsweredQuestions }}</span> de <span class="text-green-200 text-xl">10</span></li>
          <li class="flex items-center gap-1"><span class="mr-1">-</span> Pontos adquiridos: <span :class="['text-xl', totalScore < 700 ? 'text-red-500' : totalScore < 1300 ? 'text-orange-500' : 'text-green-500']">{{ totalScore }}</span></li>
          <li class="flex items-center gap-1"><span class="mr-1">-</span> Tempo total: <span :class="['text-xl', time <= 60 ? 'text-green-200' : time <= 120 ? 'text-orange-500' : 'text-red-500']">{{ formattedTimer }}</span></li>
        </ul>
        <h2 class="pr-2"><span :class="['text-[5em] italic font-extrabold glaze', totalScore < 111 ? 'text-gray-500' : totalScore < 333 ? 'text-blue-300' : totalScore < 666 ? 'text-green-500' : totalScore < 999 ? 'text-yellow-200' : totalScore < 1332 ? 'text-red-500' : totalScore < 1665 ? 'text-pink-400' : 'text-white']">{{ concept(totalScore) }}</span></h2>
      </div>
    </div>
    <div class="flex gap-3">
      <a v-bind:href="dashboardRedirect" class="bg-white text-black font-semibold py-2 px-6 rounded-3xl hover:opacity-[.8] cursor-pointer relative top-5 flex gap-2 pl-4 items-center"><ArrowLeft/> Voltar ao Dashboard</a>
      <a v-bind:href="replayQuiz" class="bg-[#0A0A0A] text-white border-2 border-white font-semibold py-2 px-6 rounded-3xl transition-[.5] hover:text-black hover:bg-white cursor-pointer relative top-5 flex gap-2 pl-4 items-center"><RotateCcw/> Reiniciar Quiz</a>
    </div>
  </div>
</template>
<script setup>
  import concept from '@/functions/quizGamaplay/conceptCalculation';
  import QuizOnlineLogo from '@/components/QuizOnlineLogo.vue';
  import { ArrowLeft } from 'lucide-vue-next';
  import { RotateCcw } from 'lucide-vue-next';

  const props = defineProps({ // Props
    totalScore: Number,
    rightAnsweredQuestions: Number,
    time: Number,
    formattedTimer: String,
    dashboardRedirect: String,
    replayQuiz: String
  })

</script>
<style scoped>
  .glaze {
    text-shadow: 0px 0px 7px white;
  }
</style>