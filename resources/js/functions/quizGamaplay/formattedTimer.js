import { computed } from "vue";

export default function formattedTimer(time) {
  return computed(() => {
    const minutes = Math.floor(time.value / 60).toString().padStart(2, "0");
    const seconds = Math.floor(time.value % 60).toString().padStart(2, "0");

    return `${minutes}:${seconds}`;
  });
}