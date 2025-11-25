<template>
  <div>
    <Head title="Melhores Pontuações"/>
    <AppLayout :breadcrumbs="breadcrumbs">
    <div class="relative min-h-[100vh] px-5 py-3 m-5 flex-1 rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border ">
      <ElegantTitle title="Melhores Pontuações" stylization="text-2xl font-bold" class="mb-3"/>
      <div v-if="allResults.length > 0" class="border-2 border-[##0a0a0a] rounded-b-lg">
        <BestScoresTable :allResults="allResults"/>
      </div>
      <div v-else class="flex flex-col gap-5 items-center gap-2 justify-center text-xl h-80 text-center mq-topscore-nodata">
        <img :src="top1" alt="primeirão">
        <h2>Parece que ninguém iniciou e terminou um quiz ainda... <br>Seja o primeiro a terminar e ficar no topo!</h2>
      </div>
    </div>
    </AppLayout>
  </div>
</template>
<script setup>
  /* Importações de componente, layout e funcionalidades do Vue.js, respectivamente */
  import ElegantTitle from '@/components/ElegantTitle.vue';
  import AppLayout from '@/layouts/AppLayout.vue';
  import { Head } from '@inertiajs/vue3';
  import { onMounted, ref } from 'vue';

  /* Importações de estilos e media-query, respectivamente */
  import '../../css/scrollbar.css';
  import '../../css/media-query.css'

  /* Importações de componentes de interface */
  import top1 from '../../icons/top1.svg';
  import BestScoresTable from '@/components/pages/TopScore/BestScoresTable.vue';

  const allResults = ref([]); // Constante na qual recebe as estatísticas gerais de todos os usuários cadastrados no sistema

  async function fetchAllResults() { // Função assíncrona que pega as informações de todos os usuários do sistema registrados no banco de dados via API
    const response = await fetch('/quiz/all-results'); // Aguarda receber a requisão dos dados na rota descrita
    allResults.value = await response.json(); // allResults aguarda receber a resposta da requisição já transformada em formato JSON
  }

  onMounted(() => fetchAllResults()); // Assim que página for montada, ou seja, carregada, é chamado a função de pegar as informações de todos os usuários do sistema
</script>
<style scoped> /* Estilizaçaõ local apenas para colorir o 1º, 2º e 3º colocado no ranking */
  .gold {
    text-shadow: 0 0 10px yellow;
  }.silver {
    text-shadow: 0 0 10px white;
  }.bronze {
    text-shadow: 0 0 10px rgb(198, 129, 0);
  }
</style>
