<template>
  <div>
    <Head title="Dashboard"/>
    <AppLayout :breadcrumbs="breadcrumbs">
      <div class="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
        <ElegantTitle title="Minhas Estatísticas" stylization="text-2xl font-bold"/>
        <div class="flex-1 relative min-h-full rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border bg-[#121212]">
          <div class="flex gap-5 p-4 h-full flex-wrap mq-dashboard-main-3cards-container">

            <div class="flex flex-col flex-1 bg-[#0A0A0A] p-4 border-2 rounded-md mq-dashboard-child-container1">
              <div class="flex flex-col">
                <ElegantTitle title="Geral" stylization="text-xl font-bold" class="pb-4"/>

                <div v-if="userStats.resultados.length > 0">
                  <DashboardGeneralUserStatistics 
                    :quizesTotais="userStats.total_quizzes"
                    :totalAcertos="userStats.total_acertos"
                    :totalErros="((10 * userStats.total_quizzes) - (userStats.total_acertos))"
                    :mediaAcertos="Math.round(userStats.media_acertos)"
                    :percentualAcertos="Math.round(userStats.porcentagem_acertos)"
                    :totalPontos="userStats.total_pontos"
                    :maiorPontuacao="userStats.maior_pontuacao"
                    :conceitoMedio="userStats.conceito_medio"
                    :maiorConceito="userStats.maior_conceito"
                    :tempoTotalGasto="formattedTime(userStats.total_tempo)"
                    :tempoMedioGasto="formattedTime(userStats.tempo_medio_gasto)"
                    :tempoRecordeGasto="formattedTime(userStats.tempo_recorde)"
                    :maiorTempoGasto="formattedTime(userStats.tempo_maior)"
                  />
                </div>

                <div v-else class="flex flex-col justify-center items-center gap-5 h-120">
                  <img class="w-25" :src="statistics" alt="estatísticas">
                  <h3 class="text-lg text-center">Inicie e termine quizzes para ver suas estatísticas gerais!</h3>
                </div>
              </div>
            </div>

            <div class="flex flex-col flex-1 bg-[#0A0A0A] p-4 border-2 rounded-md mq-dashboard-child-container2">
              <div class="flex flex-col">
                <ElegantTitle title="Histórico de Quizzes" stylization="text-xl font-bold" class="pb-4"/>

                <div v-if="userStats.resultados.length > 0" class="overflow-y-auto max-h-[calc(100vh-290px)] custom-scrollbar pr-2 mr-[-8px] mq-dashboard-history-cards mq-dashboard-child-container2-overflow hasdata">
                  <div v-for="data in userStats.resultados" :key="data.id" class="border-2 bg-[#121212] rounded-lg p-4 mb-4">
                    <DashboardQuizHistoryCards
                      :dataCriacaoQuiz="formattedCreatedQuiz(data.created_at)"
                      :pontos="data.pontos"
                      :acertos="data.acertos"
                      :tempoSegundos="formattedTime(data.tempo_segundos)"
                      :conceito="data.conceito"
                    />
                  </div>
                </div>

                <div v-else class="flex flex-col justify-center items-center gap-5 h-120">
                  <img class="w-25" :src="history" alt="histórico">
                  <h3 class="text-lg text-center">Inicie e termine quizzes para aparecer seus registros!</h3>
                </div>
              </div>
            </div>

            <div class="flex flex-col flex-1 bg-[#0A0A0A] p-4 border-2 rounded-md mq-dashboard-child-container3">
              <div class="flex flex-col">
                <ElegantTitle title="Emblemas" stylization="text-xl font-bold" class="pb-4"/>

                <div v-if="userStats.resultados.length > 0" class="overflow-y-auto max-h-[calc(100vh-290px)] custom-scrollbar pr-2 mr-[-8px] mq-dashboard-badges-cards mq-dashboard-child-container3-overflow hasdata">
                  <FirstQuizBadge v-show="userStats.total_quizzes >= 1"/>
                  <TenCompletedQuizBadge v-show="userStats.total_quizzes >= 10"/>
                  <SConceptAchievedBadge v-show="SConcept"/>
                  <FasterThanLightBadge v-show="FasterThanLight"/>
                  <ZeroToLeftBadge v-show="ZeroToLeft"/>
                  <AchievedTop1Badge v-show="AchievedTop1"/>
                </div>

                <div v-else class="flex flex-col justify-center items-center gap-5 h-120">
                  <img class="w-25" :src="trophy" alt="troféu">
                  <h3 class="text-lg text-center">Inicie e termine quizzes para ter chances de desbloquear emblemas exclusívos!</h3>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </AppLayout>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';

import '../../css/scrollbar.css';
import '../../css/media-query.css';

import history from '../../icons/history.svg';
import trophy from '../../icons/trophy.svg';
import statistics from '../../icons/statistics.svg';

import ElegantTitle from '@/components/ElegantTitle.vue';
import AppLayout from '@/layouts/AppLayout.vue';
import { Head } from '@inertiajs/vue3';

import FirstQuizBadge from '@/components/badges/FirstQuizBadge.vue';
import SConceptAchievedBadge from '@/components/badges/SConceptAchievedBadge.vue';
import FasterThanLightBadge from '@/components/badges/FasterThanLight.vue';
import TenCompletedQuizBadge from '@/components/badges/TenCompletedQuizBadge.vue';
import ZeroToLeftBadge from '@/components/badges/ZeroToLeftBadge.vue';
import AchievedTop1Badge from '@/components/badges/AchievedTop1.vue';

import hasSConcept from '@/functions/DashBoard/badges/hasSConcept';
import hasFasterThanLight from '@/functions/DashBoard/badges/hasFasterThanLight';
import hasZeroToLeft from '@/functions/DashBoard/badges/hasZeroToLeft';
import hasAchievedTop1 from '@/functions/DashBoard/badges/hasAchievedTop1';

import formattedTime from '@/functions/quizGamaplay/formattedTime';
import formattedCreatedQuiz from '@/functions/quizGamaplay/formattedCreatedQuiz';

import DashboardGeneralUserStatistics from '@/components/pages/Dashboard/DashboardGeneralUserStatistics.vue';
import DashboardQuizHistoryCards from '@/components/pages/Dashboard/DashboardQuizHistoryCards.vue';

const userStats = ref({
  resultados: [],
});

async function fetchUserStats() {
  const response = await fetch('/quiz/userstats');
  return await response.json();
}

const SConcept = hasSConcept(userStats);
const FasterThanLight = hasFasterThanLight(userStats);
const ZeroToLeft = hasZeroToLeft(userStats);
const AchievedTop1 = hasAchievedTop1(userStats);

onMounted(async () => {
  userStats.value = await fetchUserStats();
});
</script>
