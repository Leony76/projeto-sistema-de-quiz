<template>
  <ul class="list-disc ml-5 leading-8">
    <li>Quizzes feitos:  {{ quizesTotais }}</li>
    <li>Total de acertos:  {{ totalAcertos }}</li>
    <li>Total de erros:  {{ totalErros }}</li>
    <li>Média de acertos por quiz:  {{ mediaAcertos }}</li>
    <li>Porcentagem média de acertos por quiz: {{ percentualAcertos }} %</li>
    <li>Total de pontos adquiridos em quizzes: {{ totalPontos }}</li>
    <li>Maior pontuação já obtida em um quiz: {{ maiorPontuacao }}</li>
    <li>Conceito médio por quiz: {{ conceitoMedio }}</li>
    <li>Maior conceito já obtido: {{ maiorConceito }}</li>
    <li>Tempo total gasto fazendo quizzes: {{ tempoTotalGasto }}</li>
    <li>Tempo médio gasto por quiz: {{ tempoMedioGasto }}</li>
    <li>Tempo recorde finalizando um quiz: {{ tempoRecordeGasto }}</li>
    <li>Maior tempo gasto em um quiz: {{ maiorTempoGasto }}</li>
  </ul>
</template>
<script setup>
  defineProps({
    quizesTotais: Number,
    totalAcertos: Number,
    totalErros: Number,
    mediaAcertos: Number,
    percentualAcertos: [Number, String],
    totalPontos: Number,
    maiorPontuacao: Number,
    conceitoMedio: String,
    maiorConceito: String,
    tempoTotalGasto: String,
    tempoMedioGasto: String,
    tempoRecordeGasto: String,
    maiorTempoGasto: String,
  })
</script> 