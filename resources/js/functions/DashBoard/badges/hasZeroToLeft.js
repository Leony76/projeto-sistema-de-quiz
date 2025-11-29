import { computed } from 'vue';

export default function hasZeroToLeft(userStats) {
  return computed(() => userStats?.value?.resultados.some(r => r.acertos === 0));
}