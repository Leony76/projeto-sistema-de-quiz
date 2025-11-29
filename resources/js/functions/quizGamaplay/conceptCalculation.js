export default function conceptCalculation(totalScore) {
  return  (totalScore <= 111)  ? 'F'  :
          (totalScore <= 222)  ? 'E-' :
          (totalScore <= 333)  ? 'E'  :
          (totalScore <= 444)  ? 'E+' :
          (totalScore <= 555)  ? 'D-' :
          (totalScore <= 666)  ? 'D'  :
          (totalScore <= 777)  ? 'D+' :
          (totalScore <= 888)  ? 'C-' :
          (totalScore <= 999)  ? 'C'  :
          (totalScore <= 1110) ? 'C+' :
          (totalScore <= 1221) ? 'B-' :
          (totalScore <= 1332) ? 'B'  :
          (totalScore <= 1443) ? 'B+' :
          (totalScore <= 1554) ? 'A-' :
          (totalScore <= 1665) ? 'A'  :
          (totalScore <= 1776) ? 'A+' :
                                  'S'
}