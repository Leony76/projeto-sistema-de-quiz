<?php

namespace App\Http\Controllers; // Classe pertencente ao diretório app/Http/Controllers

use Illuminate\Http\Request; // Importa a classe Request
use App\Models\QuizResult; // Importa o model QuizResult
use App\Models\User; // Importa o model User
use Illuminate\Support\Facades\Auth; // Importa o autenticador Auth
use Illuminate\Support\Facades\DB; // Importa o builder DB

class QuizController extends Controller { // Controller cujo a lógica principal do sistema é performado  
  public function save(Request $request) { // Método que salva os resultados obtidos após o término de um quiz para o banco de dados, na tabela 'quiz_results'
    $data = $request->validate([ // Valida as informações pegas no request dos resultados obtidos no quiz
      'conceito' => 'required|string',  
      'acertos'  => 'required|integer',
      'pontos'   => 'required|integer',
      'tempo_segundos' => 'required|integer',
    ]);

    QuizResult::create([ // Salva no banco de dados as informações do $data
      'user_id' => Auth::id(), 
      'conceito' => $data['conceito'],
      'acertos' => $data['acertos'],
      'pontos' => $data['pontos'],
      'tempo_segundos' => $data['tempo_segundos'], 
    ]);

    return response()->json(['saved' => true]); // Retorna uma resposta json confirmando com booleantrue  
    
  }

  public function listUserStats() { // Método que lista todas as informações pertinente as resultados obtidos pelos quizzes nos quais foram completados por ele
    require_once resource_path('js/functions/QuizController/avarage_concept.php'); // Importa uma função para calcular o conceito médio que o usuário tem com base em todos os conceitos que o mesmo já obteve 
    require_once resource_path('js/functions/QuizController/greatest_concept.php'); // Importa uma função para calcular o maior conceito que o mesmo já obteve em um quiz

    $results = QuizResult::where('user_id', Auth::id())->orderByDesc( // Pega todas as informações que o usuário possui no banco de dados e ordena por ondem decrescente de data
      'created_at'
    )->get();

    $userId = Auth::id(); // Pega o id do usuário

    $top = DB::table('quiz_results')->join(  // Query que pega a maior pontuação somada que um usuário no sistema possui 
      'users', 'quiz_results.user_id', '=', 'users.id' // Junta a tabela users com quiz_results a partir do id do usuário que ambas possuem 
      )->select(
        'quiz_results.user_id', DB::raw('SUM(quiz_results.pontos) as total' // Seleciona os ids do usuários e a soma de todos os pontos obtidos em quizzes
      ))->groupBy(
        'quiz_results.user_id' // Agrupa os registros pelo id dos usuários
      )->orderByDesc(
        'total' // ordena em ordem decrescente de soma total dos pontos deles
      )->first(); // Pega o primeiro registro apenas , ou seja, o de maior pontuação somada

    $topUserId = $top ? $top->user_id : null; // Pega o id do usuário com essa maior pontução somada, caso ele exista no banco

    if ($userId == $topUserId) { // Verifica caso o id do usuário logado no sistema seja igual ao id do usuário com maior pontuação somada
      User::where('id', $userId)->update(['ja_foi_top1' => true]); // Caso seja igual, é atualizado na coluna 'ja_foi_top1' da tabela de users o booleano 1
    }
    
    $once_topscore = User::where('id', $userId)->value('ja_foi_top1'); // Pega o resultado pelo id do usuário logado da coluna 'ja_foi_top1' da tabela users, que pode ser 0 (false) ou 1 (true)

    $avarage_points = $results->count() > 0 ? $results->sum('pontos')/$results->count('user_id') : 0; // Variável que recebe a média de pontos que o usuário obtêm por quiz feito
    $greatest_concept = $results->max('pontos'); // Variável que recebe a maior pontuação já obtida pelo usuário em um quiz, na qual posteriormente será convertida em um conceito
    $avarage_raq_percentage = $results->count() > 0 ? ($results->sum('acertos') / (10 * $results->count())) * 100 : 0; // Variável que recebe o cálculo do percentual médio de acertos por quiz que o usuário obtêm
    
    return response()->json([ // Retorna um resposta em formato JSON de todas as informações pegas nas queries anteriormente feitas, variáveis e algumas informações adicionais derivadas dessas queries e variáveis
      'resultados' => $results, // Registro de todos os quizzes feitos pelo usuário, incluindo pontução, nº de acertos, tempo decorrido e conceito  
      'total_quizzes' => $results->count(), // Quantidades de quizzes completados
      'total_pontos' => $results->sum('pontos'), // Somatório de todos os pontos já obtidos pelo usuário em quizzes
      'total_acertos' => $results->sum('acertos'), // Quantidade de acertos que o usuário já obteve em quizzes
      'tempo_recorde' => $results->min('tempo_segundos'), // Tempo recorde que o usuário completou um quiz
      'tempo_maior' => $results->max('tempo_segundos'), // Maior tempo que um usuário levou para completar um quiz
      'media_acertos' => $results->avg('acertos'), // Quantidade média de acertos por quiz que o usuário obtêm 
      'porcentagem_acertos' => floor($avarage_raq_percentage), // Percentual de acertos que o usuário tem por quiz feito
      'maior_pontuacao' => $results->max('pontos'), // Maior pontução já obtida pelo usuário em um quiz
      'total_tempo' => $results->sum('tempo_segundos'), // Tempo total que o usuário já gastou realizando quiz
      'conceito_medio' => avarageConcept($avarage_points), // Conceito médio que o usuário obtêm por quiz 
      'maior_conceito' => greatestConcept($greatest_concept), // Maior conceito já obtido pelo usuário em um quiz
      'tempo_medio_gasto' => $results->avg('tempo_segundos'), // Tempo médio gasto pel usuário em um quiz 
      'eh_top1' => $once_topscore, // Flag que estado para saber se o usuário já foi ou não primeiro colocado no rank de melhores pontuações ao menos uma vez
    ]);
  }

  public function allResults() { // Método que retorna os registros de todos os usuários cadastrados no sistema, incluindo os seus resultados obtidos em quizzes e outros informações derivados desses resultados
    require_once resource_path('js/functions/QuizController/greatest_concept.php'); // Importa uma função para calcular o maior conceito que o mesmo já obteve em um quiz
    require_once resource_path('js/functions/QuizController/avarage_concept.php'); // Importa uma função para calcular o conceito médio que o usuário tem com base em todos os conceitos que o mesmo já obteve

    $results = DB::table('quiz_results') // Recebe o os resgistros de informções de todos os usuário do banco de dados já registrados
      ->join(
        'users', 'users.id', '=', 'quiz_results.user_id' // Junta a tabela users com a tabela quiz_results pela ligação do id do usuário em ambas as tabelas pelas colunas id e user_id
      )->select(
        'users.id as user_id', 'users.name as user_name', // Seleciona os ids dos usuários e seus nomes
        DB::raw('SUM(quiz_results.acertos) as acertos_totais'), // Seleciona a soma de todos os acertos obtidos por eles em quizzes
        DB::raw('SUM(quiz_results.pontos) as pontuacao_total'), // Seleciona a soma de todos os pontos obtidos por eles em quizzes
        DB::raw('COUNT(quiz_results.id) as quizzes_totais'), // Seleciona a contagem de todos os quizzes feitos por eles
        DB::raw('MAX(quiz_results.pontos) as maior_pontuacao'), // Seleciona a pontuação máxima já obtida por eles
        DB::raw('SUM(quiz_results.tempo_segundos) as tempo_total'), // Seleciona o somatório de todos os tempos gastos nos quizzes feitos por eles
        DB::raw('AVG(quiz_results.tempo_segundos) as tempo_medio'), // Seleciona o tempo médio gasto por quiz por eles
      )->addSelect([ // Mais uma query de SELECT para pegar o último registro de tempo em segundos gasto pelos usuários em seus últimos quizzes realizados
        'ultimo_tempo' => DB::table('quiz_results as qr')->select( 
          'qr.tempo_segundos' // É selecionado da tabela quiz_results o tempo em segundos
        )->whereColumn(
          'qr.user_id', 'users.id' // Onde a coluna seja a dos ids dos usuários
        )->orderBy(
          'qr.id', 'DESC' // Ordenado em ordem decrescente de id
        )->limit(1) // pegando apenas o último registro de tempo
      ])->groupBy(
        'user_id', 'user_name' // Agrupado pelos ids e nomes dos usuários
      )->orderBy(
        'pontuacao_total', 'DESC' // Em ordem decrescente de pontuação total somada
      )->get();

    foreach ($results as $r) { // calcular maior conceito e o conceito médio para cada usuário individualmente
      $maior = $r->maior_pontuacao; // pega a maior pontuação já obtida pelos usuários
      $pontuacao_total = $r->pontuacao_total; // pega a pontuação total somada dos usuários
      $quizzes_feitos = $r->quizzes_totais; // pega a quantidade de quizzes já feitos pelos usuários

      $avarage_points_per_user = round($pontuacao_total / $quizzes_feitos); // Variável recebr a média de pontos obtidos pelos usuários por quiz realizado

      $r->maior_conceito = greatestConcept($maior); // É calculado e atribuido o maior conceito já obtido por cada usuário
      $r->conceito_medio = avarageConcept($avarage_points_per_user); // É calculado e atribuido o conceito médio quem cada usuário obtêm por quiz realizado
    }

    return response()->json($results); // É retornado uma resposta com tudo que foi pego pelos registros nas queries anteriormente feitas em formato JSON
  }
} 