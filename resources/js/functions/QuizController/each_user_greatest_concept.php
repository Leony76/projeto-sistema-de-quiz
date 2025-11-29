<?php 
  function eachUserGreatestConcept($maior) {
    if ($maior <= 111)  return 'F';
    if ($maior <= 222)  return 'E-';
    if ($maior <= 333)  return 'E';
    if ($maior <= 444)  return 'E+';
    if ($maior <= 555)  return 'D-';
    if ($maior <= 666)  return 'D';
    if ($maior <= 777)  return 'D+';
    if ($maior <= 888)  return 'C-';
    if ($maior <= 999)  return 'C';
    if ($maior <= 1110) return 'C+';
    if ($maior <= 1221) return 'B-';
    if ($maior <= 1332) return 'B';
    if ($maior <= 1443) return 'B+';
    if ($maior <= 1554) return 'A-';
    if ($maior <= 1665) return 'A';
    if ($maior <= 1776) return 'A+';
    return 'S';  
  }
?>