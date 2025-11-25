<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\QuizController;
use App\Http\Controllers\QuestionController;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return redirect('/login');
});

Route::get('dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('quiz', function () {
    return Inertia::render('Quiz');
})->middleware(['auth', 'verified'])->name('quiz');

Route::get('topscore', function () {
    return Inertia::render('TopScore');
})->middleware(['auth', 'verified'])->name('topscore');

Route::get('quizgameplay', function () {
    return Inertia::render('QuizGameplay');
})->middleware(['auth', 'verified'])->name('quizgameplay');

Route::post('quiz/save', [QuizController::class, 'save'])->middleware(['auth', 'verified'])->name('quiz.save');

Route::get('quiz/userstats', [QuizController::class, 'listUserStats'])->middleware(['auth', 'verified'])->name('quiz.userstats');

Route::get('/quiz/all-results', [QuizController::class, 'allResults'])->middleware(['auth', 'verified'])->name('quiz.all-results');

Route::get('quiz/questions', [QuestionController::class, 'index'])->middleware(['auth', 'verified'])->name('quiz.questions');

require __DIR__.'/settings.php';

        