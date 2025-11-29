<template>
  <div class="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
    <div class="relative min-h-[100vh] flex-1 rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border ">
      <div class="flex flex-col justify-center items-center h-[calc(100%-20px)] mq-quiz-maincontainer">
        <h1 class="flex items-center gap-3 text-[3em] font-bold"><Flag size="50"/><span>Iniciar Quiz</span></h1>
        <p class="text-lg">Ao iniciar o quiz, você será sumetido a 10 questões aleatórias sobre front, back e outras linguagens de programação.</p>
        <br>
        <ul class="text-normal list-disc">
          <li class="mq-quiz-li">Cada questão terá 4 afirmativas, nas quais apenas 1 se satisfaz verdadeira;</li>
          <li class="mq-quiz-li">Assim que inciar, será cronometrado o tempo total que você levará até terminar o quiz;</li>
          <li class="mq-quiz-li">Haverá 3 níveis de dificuldades de questões, com pontuações amparadas: Fácil = 100, Média = 200, Difícil = 300;</li>
          <li class="mq-quiz-li">Com até 1 minuto de quiz, os pontos valerão 100%, porém com 2 minutos, 50% e por fim 3 minutos ou mais,<br> 25% do valor expecificado anteriormente.</li>
        </ul>
        <p class="text-2xl italic font-bold mt-5 goodluck">~ Boa sorte! ~</p>
        <a class="bg-white text-black px-15 py-2 rounded-4xl text-2xl font-[900] mt-8 cursor-pointer hover:opacity-[.8]" :href="quizGameplayRedirect">Iniciar</a>
      </div>
    </div>
  </div>
</template>
<script setup>
  import { Flag } from 'lucide-vue-next';

  defineProps({
    quizGameplayRedirect: String
  })
</script>