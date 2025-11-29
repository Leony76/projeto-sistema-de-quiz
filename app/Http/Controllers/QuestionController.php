<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Questions;

class QuestionController extends Controller {
    public function index() {
        return Questions::all();
    }
}
