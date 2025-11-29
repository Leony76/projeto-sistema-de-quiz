export default function startTimer(timer, time) {
    timer.value = setInterval(() => {
      time.value++;
    }, 1000);
  }
