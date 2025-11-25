import { computed } from 'vue';

export default function hasFasterThanLight(userStats) {
  return computed(() => userStats?.value?.resultados.some(r => r.tempo_segundos < 15));
}