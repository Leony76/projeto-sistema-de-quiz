<?php

namespace App\Models; // Classe pertencente ao diretório app/Models

use Illuminate\Database\Eloquent\Model; // Importa o Model

class QuizResult extends Model {
    protected $fillable = [ // É preenchido na tabela quiz_results nas colunas respectivas do atribuitos abaixo suas informações trazidas
        'user_id',
        'conceito',
        'acertos',
        'pontos',
        'tempo_segundos',
    ];
}