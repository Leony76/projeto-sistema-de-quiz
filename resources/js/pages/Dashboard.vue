<template>
  <div>
    <!-- Componente de Títilo da página na aba do browser -->
    <Head title="Dashboard"/>
    <!-- Componente de Layout da página como o todo -->
    <AppLayout :breadcrumbs="breadcrumbs">
      <div class="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
        <!-- Componente de Título estilizado -->
        <ElegantTitle title="Minhas Estatísticas" stylization="text-2xl font-bold"/>
        <div class="flex-1 relative min-h-full rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border bg-[#121212]">
          <div class="flex gap-5 p-4 h-full flex-wrap mq-dashboard-main-3cards-container">
            <div class="flex flex-col flex-1 bg-[#0A0A0A] p-4 border-2 rounded-md mq-dashboard-child-container1">
              <div class="flex flex-col">
                <!-- Componente de Título estilizado -->
                <ElegantTitle title="Geral" stylization="text-xl font-bold" class="pb-4"/>
                <!-- Caso exista dados trazidos do banco via API -->
                <div v-if="userStats.resultados.length > 0">
                  <!-- Componente onde é exibido as estatísticas gerais do usuário -->
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
                <!-- Caso não exista dados trazidos do banco via API -->
                <div v-else class="flex flex-col justify-center items-center gap-5 h-120">
                  <img class="w-25" :src="statistics" alt="estatísticas">
                  <h3 class="text-lg text-center">Inicie e termine quizzes para ver suas estatísticas gerais! </h3>
                </div>
              </div>
            </div>
            <div class="flex flex-col flex-1 bg-[#0A0A0A] p-4 border-2 rounded-md mq-dashboard-child-container2">
              <div class="flex flex-col">
                <!-- Componente de Título estilizado -->
                <ElegantTitle title="Histórico de Quizzes" stylization="text-xl font-bold" class="pb-4"/>
                <!-- Caso exista dados trazidos do banco via API -->
                <div v-if="userStats.resultados.length > 0" class="overflow-y-auto max-h-[calc(100vh-290px)] custom-scrollbar pr-2 mr-[-8px] mq-dashboard-history-cards mq-dashboard-child-container2-overflow hasdata">
                  <!-- Pega todos os dados de cada registro de quiz feito pelo usuário -->
                  <div v-for="data in userStats.resultados" :key="data.id" class="border-2 bg-[#121212] rounded-lg p-4 mb-4">
                    <!-- Componente que exibe o histórico de quizzes que o usuário realizou -->
                    <DashboardQuizHistoryCards
                      :dataCriacaoQuiz="formattedCreatedQuiz(data.created_at)"
                      :pontos="data.pontos"
                      :acertos="data.acertos"
                      :tempoSegundos="formattedTime(data.tempo_segundos)"
                      :conceito="data.conceito"
                    />
                  </div>
                </div>
                <!-- Caso não exista dados trazidos do banco via API -->
                <div v-else class="flex flex-col justify-center items-center gap-5 h-120">
                  <img class="w-25" :src="history" alt="histórico">
                  <h3 class="text-lg text-center">Inicie e termine quizzes para aparecer seus registros! </h3>
                </div>
              </div>
            </div>
            <div class="flex flex-col flex-1 bg-[#0A0A0A] p-4 border-2 rounded-md mq-dashboard-child-container3">
              <div class="flex flex-col">
                <!-- Componente de Título estilizado -->
                <ElegantTitle title="Emblemas" stylization="text-xl font-bold" class="pb-4"/>
                <!-- Caso exista dados trazidos do banco via API -->
                <div v-if="userStats.resultados.length > 0" class="overflow-y-auto max-h-[calc(100vh-290px)] custom-scrollbar pr-2 mr-[-8px] mq-dashboard-badges-cards mq-dashboard-child-container3-overflow hasdata">
                  <!-- Componente de emblema que é concedido a usuário caso complete ao menos 1 quiz -->
                  <FirstQuizBadge v-show="userStats.total_quizzes >= 1"/>
                  <!-- Componente de emblema que é concedido a usuário caso complete ao menos 10 quizzes -->
                  <TenCompletedQuizBadge v-show="userStats.total_quizzes >= 10"/>
                  <!-- Componente de emblema que é concedido a usuário caso obtenha conceito S ao completar um quiz -->
                  <SConceptAchievedBadge v-show="SConcept"/>
                  <!-- Componente de emblema que é concedido a usuário caso complete um quiz em menos de 15 segundos -->
                  <FasterThanLightBadge v-show="FasterThanLight"/>
                  <!-- Componente de emblema que é concedido a usuário caso complete um quiz sem acertar uma única questão -->
                  <ZeroToLeftBadge v-show="ZeroToLeft"/>
                  <!-- Componente de emblema que é concedido a usuário caso alcance 1º colocado no rank de melhores pontuações ao menos uma vez -->
                  <AchievedTop1Badge v-show="AchievedTop1"/>
                </div>
                <!-- Caso não exista dados trazidos do banco via API -->
                <div v-else class="flex flex-col justify-center items-center gap-5 h-120">
                  <img class="w-25" :src="trophy" alt="troféu">
                  <h3 class="text-lg text-center">Inicie e termine quizzes para ter chances de desbloquear emblemas exclusívos! </h3>
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
  /* Importações de hooks */
  import { ref, onMounted, computed } from 'vue';
  
  /* Importações de CSS + Media-query */
  import '../../css/scrollbar.css';
  import '../../css/media-query.css';
  
  /* Importações de ícones */
  import history from '../../icons/history.svg';
  import trophy from '../../icons/trophy.svg';
  import statistics from '../../icons/statistics.svg';

  /* Importações de componentes do Vue.js */
  import ElegantTitle from '@/components/ElegantTitle.vue';
  import AppLayout from '@/layouts/AppLayout.vue';
  import { Head } from '@inertiajs/vue3';
  
  /* Importações dos componentes de emblema */
  import FirstQuizBadge from '@/components/badges/FirstQuizBadge.vue';
  import SConceptAchievedBadge from '@/components/badges/SConceptAchievedBadge.vue';
  import FasterThanLightBadge from '@/components/badges/FasterThanLight.vue';
  import TenCompletedQuizBadge from '@/components/badges/TenCompletedQuizBadge.vue';
  import ZeroToLeftBadge from '@/components/badges/ZeroToLeftBadge.vue';
  import AchievedTop1Badge from '@/components/badges/AchievedTop1.vue';

  /* Importação de funções que validam se as condições de conceção dos emblemas se satisfazem verdadeiras */
  import hasSConcept from '@/functions/DashBoard/badges/hasSConcept';
  import hasFasterThanLight from '@/functions/DashBoard/badges/hasFasterThanLight';
  import hasZeroToLeft from '@/functions/DashBoard/badges/hasZeroToLeft';
  import hasAchievedTop1 from '@/functions/DashBoard/badges/hasAchievedTop1';

  /* Importação de funções de formatação de tempo e data de realização de um quiz, respectivamente (69 -> 01:09) (2025-11-23T21:44:26.000000Z -> 23/11/25, 21:44)*/
  import formattedTime from '@/functions/quizGamaplay/formattedTime';
  import formattedCreatedQuiz from '@/functions/quizGamaplay/formattedCreatedQuiz';

  /* Importação de componentes que exibem as estatísticas gerais do usuário e o histórico de quizzes realizados, respectiamente*/
  import DashboardGeneralUserStatistics from '@/components/pages/Dashboard/DashboardGeneralUserStatistics.vue';
  import DashboardQuizHistoryCards from '@/components/pages/Dashboard/DashboardQuizHistoryCards.vue';

  const userStats = ref({ // constante que recebe o resultado de todas as informações pertinentes ao usuário
    resultados: [],
  });

  async function fetchUserStats() { // Função assíncrona que pega o resultado de todas as informações pertinentes ao usuário
    const response = await fetch('/quiz/userstats'); // Pega os dados da rota via API
    return await response.json(); // Recebe os dados transformados em formato JSON
  }

  const SConcept = hasSConcept(userStats); // Constante que retorna um booleano (true / false) de verificação da função caso o usuário tenha conseguido conceito S em um quiz 
  const FasterThanLight = hasFasterThanLight(userStats); // Constante que retorna um booleano (true / false) de verificação da função caso o usuário tenha terminado um quiz em menos de 15 segundos
  const ZeroToLeft = hasZeroToLeft(userStats); // Constante que retorna um booleano (true / false) de verificação da função caso o usuário tenha conseguido errar todas as questões de um quiz
  const AchievedTop1 = hasAchievedTop1(userStats); // Constante que retorna um booleano (true / false) de verificação da função caso o usuário tenha alcançado 1º colocado no rank de melhores pontuações ao menos uma vez 

  onMounted(async() => { // Hook do Vue.js que contém uma função anônima assícrona que espera receber os dados do banco via API e atribui à variável userStats
    userStats.value = await fetchUserStats();
  });
</script>
