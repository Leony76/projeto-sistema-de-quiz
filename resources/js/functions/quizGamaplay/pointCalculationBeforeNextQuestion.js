export default function pointCalculationBeforeNextQuestion(
  questionData,
  currentQuestion,
  selectedOption,
  totalScore,
  rightAnsweredQuestions,
  time,
) {
  const question = questionData.value[currentQuestion.value]; 

  if (!question)return;

  const rightAnswer = question.resposta_correta;

  if (selectedOption.value === rightAnswer) {
    switch (question.dificuldade) {
      case "Fácil" : {
        if (time.value <= 60) {
          totalScore.value += 100; 
        } else if (time.value <= 120) {
          totalScore.value += 50;
        } else {
          totalScore.value += 25;
        } break;
      } case "Médio" : {
        if (time.value <= 60) {
          totalScore.value += 200; 
        } else if (time.value <= 120) {
          totalScore.value += 100;
        } else {
          totalScore.value += 50;
        } break;
      } default: {
        if (time.value <= 60) {
          totalScore.value += 300; 
        } else if (time.value <= 120) {
          totalScore.value += 150;
        } else {
          totalScore.value += 75;
        } break;
      }
    }
    
    rightAnsweredQuestions.value += 1;
  }
}