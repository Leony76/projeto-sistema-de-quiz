<?php 
  function greatestConcept($greatest_concept) {
    if ($greatest_concept <= 111) {
      return 'F';
    } elseif ($greatest_concept <= 222) {
      return 'E-';
    } elseif ($greatest_concept <= 333) {
      return 'E';
    } elseif ($greatest_concept <= 444) {
      return 'E+';
    } elseif ($greatest_concept <= 555) {
      return 'D-';
    } elseif ($greatest_concept <= 666) {
      return 'D';
    } elseif ($greatest_concept <= 777) {
      return 'D+';
    } elseif ($greatest_concept <= 888) {
      return 'C-';
    } elseif ($greatest_concept <= 999) {
      return 'C';
    } elseif ($greatest_concept <= 1110) {
      return 'C+';
    } elseif ($greatest_concept <= 1221) {
      return 'B-';
    } elseif ($greatest_concept <= 1332) {
      return 'B';
    } elseif ($greatest_concept <= 1443) {
      return 'B+';
    } elseif ($greatest_concept <= 1554) {
      return 'A-';
    } elseif ($greatest_concept <= 1665) {
      return 'A';
    } elseif ($greatest_concept <= 1776) {
      return 'A+';
    } else {
      return 'S';
    }
  }
?>