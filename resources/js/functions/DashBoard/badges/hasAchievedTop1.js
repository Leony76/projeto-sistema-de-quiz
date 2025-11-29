import { computed } from "vue";

export default function hasAchievedTop1(userStats) {
  return computed(() => userStats?.value?.eh_top1);
}
