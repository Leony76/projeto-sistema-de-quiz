<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\QuizResult;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class QuizController extends Controller {

  public function save(Request $request) {
    $data = $request->validate([
      'conceito' => 'required|string',
      'acertos'  => 'required|integer',
      'pontos'   => 'required|integer',
      'tempo_segundos' => 'required|integer',
    ]);

    QuizResult::create([
      'user_id' => Auth::id(),
      'conceito' => $data['conceito'],
      'acertos' => $data['acertos'],
      'pontos' => $data['pontos'],
      'tempo_segundos' => $data['tempo_segundos'],
    ]);

    return response()->json(['saved' => true]);
  }

  public function listUserStats() {
    require_once resource_path('js/functions/QuizController/avarage_concept.php');
    require_once resource_path('js/functions/QuizController/greatest_concept.php');

    $results = QuizResult::where('user_id', Auth::id())
      ->orderByDesc('created_at')
      ->get();

    $userId = Auth::id();

    $top = DB::table('quiz_results')
      ->join('users', 'quiz_results.user_id', '=', 'users.id')
      ->select(
        'quiz_results.user_id',
        DB::raw('SUM(quiz_results.pontos) as total')
      )
      ->groupBy('quiz_results.user_id')
      ->orderByDesc('total')
      ->first();

    $topUserId = $top ? $top->user_id : null;

    if ($userId == $topUserId) {
      User::where('id', $userId)->update(['ja_foi_top1' => true]);
    }
    
    $once_topscore = User::where('id', $userId)->value('ja_foi_top1');

    $avarage_points = $results->count() > 0 
      ? $results->sum('pontos') / $results->count('user_id') 
      : 0;

    $greatest_concept = $results->max('pontos');

    $avarage_raq_percentage = $results->count() > 0 
      ? ($results->sum('acertos') / (10 * $results->count())) * 100 
      : 0;
    
    return response()->json([
      'resultados' => $results,
      'total_quizzes' => $results->count(),
      'total_pontos' => $results->sum('pontos'),
      'total_acertos' => $results->sum('acertos'),
      'tempo_recorde' => $results->min('tempo_segundos'),
      'tempo_maior' => $results->max('tempo_segundos'),
      'media_acertos' => $results->avg('acertos'),
      'porcentagem_acertos' => floor($avarage_raq_percentage),
      'maior_pontuacao' => $results->max('pontos'),
      'total_tempo' => $results->sum('tempo_segundos'),
      'conceito_medio' => avarageConcept($avarage_points),
      'maior_conceito' => greatestConcept($greatest_concept),
      'tempo_medio_gasto' => $results->avg('tempo_segundos'),
      'eh_top1' => $once_topscore,
    ]);
  }

  public function allResults() {
    require_once resource_path('js/functions/QuizController/greatest_concept.php');
    require_once resource_path('js/functions/QuizController/avarage_concept.php');

    $results = DB::table('quiz_results')
      ->join('users', 'users.id', '=', 'quiz_results.user_id')
      ->select(
        'users.id as user_id',
        'users.name as user_name',
        DB::raw('SUM(quiz_results.acertos) as acertos_totais'),
        DB::raw('SUM(quiz_results.pontos) as pontuacao_total'),
        DB::raw('COUNT(quiz_results.id) as quizzes_totais'),
        DB::raw('MAX(quiz_results.pontos) as maior_pontuacao'),
        DB::raw('SUM(quiz_results.tempo_segundos) as tempo_total'),
        DB::raw('AVG(quiz_results.tempo_segundos) as tempo_medio')
      )
      ->addSelect([
        'ultimo_tempo' => DB::table('quiz_results as qr')
          ->select('qr.tempo_segundos')
          ->whereColumn('qr.user_id', 'users.id')
          ->orderBy('qr.id', 'DESC')
          ->limit(1)
      ])
      ->groupBy('user_id', 'user_name')
      ->orderBy('pontuacao_total', 'DESC')
      ->get();

    foreach ($results as $r) {
      $maior = $r->maior_pontuacao;
      $pontuacao_total = $r->pontuacao_total;
      $quizzes_feitos = $r->quizzes_totais;

      $avarage_points_per_user = round($pontuacao_total / $quizzes_feitos);

      $r->maior_conceito = greatestConcept($maior);
      $r->conceito_medio = avarageConcept($avarage_points_per_user);
    }

    return response()->json($results);
  }
}
