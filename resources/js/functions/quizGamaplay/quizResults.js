export default function quizResults(
  totalScore,
  rightAnsweredQuestions,
  time
) {
  const concept = // conceito é definido pela quantidade de pontos obtido pelo usuário no quiz
    (totalScore.value <= 111)  ? 'F'  : 
    (totalScore.value <= 222)  ? 'E-' : 
    (totalScore.value <= 333)  ? 'E'  : 
    (totalScore.value <= 444)  ? 'E+' : 
    (totalScore.value <= 555)  ? 'D-' : 
    (totalScore.value <= 666)  ? 'D'  : 
    (totalScore.value <= 777)  ? 'D+' : 
    (totalScore.value <= 888)  ? 'C-' : 
    (totalScore.value <= 999)  ? 'C'  : 
    (totalScore.value <= 1110) ? 'C+' : 
    (totalScore.value <= 1221) ? 'B-' : 
    (totalScore.value <= 1332) ? 'B'  : 
    (totalScore.value <= 1443) ? 'B+' : 
    (totalScore.value <= 1554) ? 'A-' : 
    (totalScore.value <= 1665) ? 'A'  : 
    (totalScore.value <= 1776) ? 'A+' : 'S';

  const payload = { // Objeto que armazena os resultados obtidos pelo usuário no quiz
    conceito: concept,
    acertos: rightAnsweredQuestions.value,
    pontos: totalScore.value,
    tempo_segundos: time.value,
  }

  return payload;
}

