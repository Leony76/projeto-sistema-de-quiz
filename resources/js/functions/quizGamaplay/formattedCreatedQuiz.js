export default function formattedCreatedQuiz(dataString) {
    const date = new Date(dataString);
    
    return date.toLocaleString("pt-Br", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }