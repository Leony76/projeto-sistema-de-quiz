<?php 
  function avarageConcept($concept) {
    if ($concept <= 111) {
      return 'F';
    } elseif ($concept <= 222) {
      return 'E-';
    } elseif ($concept <= 333) {
      return 'E';
    } elseif ($concept <= 444) {
      return 'E+';
    } elseif ($concept <= 555) {
      return 'D-';
    } elseif ($concept <= 666) {
      return 'D';
    } elseif ($concept <= 777) {
      return 'D+';
    } elseif ($concept <= 888) {
      return 'C-';
    } elseif ($concept <= 999) {
      return 'C';
    } elseif ($concept <= 1110) {
      return 'C+';
    } elseif ($concept <= 1221) {
      return 'B-';
    } elseif ($concept <= 1332) {
      return 'B';
    } elseif ($concept <= 1443) {
      return 'B+';
    } elseif ($concept <= 1554) {
      return 'A-';
    } elseif ($concept <= 1665) {
      return 'A';
    } elseif ($concept <= 1776) {
      return  'A+';
    } else {
      return 'S';
    }
  }
?>