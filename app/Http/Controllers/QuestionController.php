<?php

namespace App\Http\Controllers; // Classe pertencente ao diretório app/Http/Controllers

use Illuminate\Http\Request; // Importa a classe Request
use Illuminate\Support\Facades\DB; // Importa o builder DB
use App\Models\Questions; // Importa o model Questions

class QuestionController extends Controller {
    public function index() { // Método único e principal desse controller, unicamente para retornar todas as questões dos quizzes
        return Questions::all(); // Retorna todas as questões da tabela questions
    }
}
