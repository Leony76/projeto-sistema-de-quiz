<template>
  <div v-if="currentQuestion < 10" class="flex flex-col justify-center items-center h-full w-1/3 m-auto mt-20">
    <QuizQuestions :dashboardRedirect="dashboard().url" :time="time" :formattedTimer="formattedTimer">
      <QuizOnlineLogo/>
      <div v-if="questionsData.length > 0" class="w-full">
        <Questions
          :currentQuestion="currentQuestion"
          :questionsData="questionsData"
          :options="options"
          :selectedOption="selectedOption"
          @select="selectOption"
        />
      </div>
      <NextButton
        :showButtonNext="showButtonNext"
        @next="nextQuestion"
      />
    </QuizQuestions>
  </div>

  <div v-else class="flex flex-col justify-center items-center h-150 w-1/3 m-auto mt-20 mq-quizgameplay-finalization">
    <QuizFinalResults
      :totalScore="totalScore"
      :rightAnsweredQuestions="rightAnsweredQuestions"
      :time="time"
      :formattedTimer="formattedTimer"
      :dashboardRedirect="dashboard().url"
      :replay-quiz="quizgameplay().url"
    />
  </div>
</template>

<script setup>
import { dashboard, quizgameplay } from '@/routes';
import { ref, onMounted, onBeforeUnmount } from 'vue';

import Questions from '@/components/pages/QuizGameplay/Questions.vue';
import Timer from '@/components/pages/QuizGameplay/Timer.vue';
import NextButton from '@/components/pages/QuizGameplay/NextButton.vue';
import QuizFinalResults from '@/components/pages/QuizGameplay/QuizFinalResults.vue';
import QuizOnlineLogo from '@/components/QuizOnlineLogo.vue';
import QuizQuestions from '@/components/pages/QuizGameplay/QuizQuestions.vue';

import shuffleQuestions from '../functions/quizGamaplay/shuffleQuestions';
import startTimer from '../functions/quizGamaplay/startTimer';
import pointsCalculation from '../functions/quizGamaplay/pointCalculationBeforeNextQuestion';
import quizResults from '../functions/quizGamaplay/quizResults';
import formattedTimerFunc from '../functions/quizGamaplay/formattedTimer';
import '../../css/media-query.css';

let currentQuestion = ref(0);
let selectedOption = ref(null);
let showButtonNext = ref(false);
let totalScore = ref(0);
let rightAnsweredQuestions = ref(0);
let time = ref(0);
let timer = ref(null);
let questionsData = ref([]);
const options = ref([]);

const formattedTimer = formattedTimerFunc(time);

const selectOption = (optionKey) => {
  const question = questionsData.value[currentQuestion.value];
  if (!question) return;

  selectedOption.value = optionKey;
  showButtonNext.value = true;
};

async function fetchQuestions() {
  const response = await fetch('/quiz/questions');
  const data = await response.json();
  questionsData.value = shuffleQuestions(data);
}

async function nextQuestion() {
  pointsCalculation(
    questionsData,
    currentQuestion,
    selectedOption,
    totalScore,
    rightAnsweredQuestions,
    time,
  );
  
  if (currentQuestion.value === 9) {
    clearInterval(timer.value);
    currentQuestion.value++;
    await saveResults();
    return;
  }
  
  currentQuestion.value++;
  options.value = shuffleQuestions(['opcao_a','opcao_b','opcao_c','opcao_d']);
  selectedOption.value = null;
  showButtonNext.value = false;
}

async function saveResults() {
  await fetch('/quiz/save', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').content,
    },
    body: JSON.stringify(
      quizResults(
        totalScore,
        rightAnsweredQuestions,
        time
      )
    ), 
  });
}

onMounted(async() => {
  startTimer(timer, time);
  await fetchQuestions();
  options.value = shuffleQuestions(['opcao_a','opcao_b','opcao_c','opcao_d']);
});

onBeforeUnmount(() => {
  clearInterval(timer.value);
});
</script>
