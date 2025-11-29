<template>
  <div class="max-h-[calc(100vh-200px)] overflow-y-auto custom-scrollbar mq-topscore-table">
    <table class="w-full border-collapse">
      <thead class="sticky top-0 bg-[#0A0A0A]">
        <tr class="bg-[#121212] th-table">
          <th class="p-2">Posição</th>
          <th class="p-2 border-l-2 border-[##0a0a0a]">Nome de Usuário</th>
          <th class="p-2 border-l-2 border-[##0a0a0a]">Pontos <br>Totais</th>
          <th class="p-2 border-l-2 border-[##0a0a0a]">Acertos <br>Totais</th>
          <th class="p-2 border-l-2 border-[##0a0a0a]">Erros <br>Totais</th>
          <th class="p-2 border-l-2 border-[##0a0a0a]">Quizzes <br>Realizados</th>
          <th class="p-2 border-l-2 border-[##0a0a0a]">Tempo Gasto no <br>Último Quiz</th>
          <th class="p-2 border-l-2 border-[##0a0a0a]">Tempo Total Gasto <br>em Quiz</th>
          <th class="p-2 border-l-2 border-[##0a0a0a]">Conceito Médio <br>por Quiz</th>
          <th class="p-2 border-l-2 border-[##0a0a0a]">Melhor <br>Conceito</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(r, index) in allResults" :key="r.id" class="border-t td-table">
          <td :class="['p-3 text-center tracking-wider', (index + 1) == 1 ? 'text-yellow-300 gold' : (index + 1) == 2 ? 'text-gray-200 silver' : (index + 1) == 3 ? 'text-orange-500 bronze' : 'text-gray-600']">{{ index + 1 }}º</td>
          <td class="p-3 border-l-2 border-[##0a0a0a]">{{ r.user_name }}</td>
          <td class="p-3 border-l-2 border-[##0a0a0a] text-center">{{ r.pontuacao_total }}</td>
          <td class="p-3 border-l-2 border-[##0a0a0a] text-center">{{ r.acertos_totais }}</td>
          <td class="p-3 border-l-2 border-[##0a0a0a] text-center">{{ (r.quizzes_totais * 10) - (r.acertos_totais) }}</td>
          <td class="p-3 border-l-2 border-[##0a0a0a] text-center">{{ r.quizzes_totais }}</td>
          <td class="p-3 border-l-2 border-[##0a0a0a] text-center">{{ formattedTime(r.ultimo_tempo) }}</td>
          <td class="p-3 border-l-2 border-[##0a0a0a] text-center">{{ formattedTime(r.tempo_total) }}</td>
          <td class="p-3 border-l-2 border-[##0a0a0a] text-center">{{ r.conceito_medio }}</td>
          <td class="p-3 border-l-2 border-[##0a0a0a] text-center">{{ r.maior_conceito }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup>
  import formattedTime from '@/functions/quizGamaplay/formattedTime';

  defineProps({
    allResults: Array,
  })
</script>