<template>
  <div class="flex items-center gap-5 m-auto w-full">
    <div class="h-1 flex-1 bg-white rounded-xl"></div>
    <h2 :class="['text-center min-w-max', stylization]">{{ title }}</h2>
    <div class="h-1 flex-1 bg-white rounded-xl"></div>
  </div>
</template> 
<script setup>
  defineProps({
    title: String,
    stylization: String,
  })
</script>