<template>
  <button v-show="showButtonNext" type="button" class="bg-white w-fit text-black font-semibold py-2 px-6 rounded-3xl hover:opacity-[.8] cursor-pointer relative top-3" @click="emit('next')">Próximo</button>
</template>
<script setup>
  defineProps({
    showButtonNext: Boolean
  })

  const emit = defineEmits('next')
</script>