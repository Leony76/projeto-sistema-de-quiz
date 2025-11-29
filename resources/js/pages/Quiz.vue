<template>
  <div>
    <Head title="Iniciar quiz"/> 
    <AppLayout :breadcrumbs="breadcrumbs">
      <QuizStart :quizGameplayRedirect="quizgameplay().url" />
    </AppLayout>
  </div>
</template>

<script setup>
import { Head } from '@inertiajs/vue3';

import AppLayout from '@/layouts/AppLayout.vue';
import QuizStart from '@/components/pages/Quiz/QuizStart.vue';

import { quizgameplay } from '@/routes';
import '../../css/media-query.css';
</script>
