import { computed } from "vue";

export default function hasSConcept(userStats) {
  return computed(() => userStats?.value?.resultados.some(r => r.conceito === "S"));
}
