<template>
  <div>
    <!-- Basicamente a a interface estática antes de inicializar um quiz, dizendo tudo o que o usuário precisa saber sobre o que vai aparecer no quiz, seu funcionamento de pontuação e ETC... -->
    <!-- Título da página na aba do browser -->
    <Head title="Iniciar quiz"/> 
    <!-- Layout padrão do Laravel  -->
    <AppLayout :breadcrumbs="breadcrumbs">
      <!-- Componente que exibe tudo o que o usuário antes de começar o quiz precisa saber, com um link 'Iniciar' que redireciona para o quiz em sí -->
      <QuizStart :quizGameplayRedirect="quizgameplay().url" />
    </AppLayout>
  </div>
</template>
<script setup>
  /* Importação de funcionalidades do Vue.js */
  import { Head } from '@inertiajs/vue3';

  /* Importações de Layout do Laravel */
  import AppLayout from '@/layouts/AppLayout.vue';
  import QuizStart from '@/components/pages/Quiz/QuizStart.vue';

  /* Importações de rota para o quizGameplay.vue e media-query, respectivamente */
  import { quizgameplay } from '@/routes';
  import '../../css/media-query.css'
</script>