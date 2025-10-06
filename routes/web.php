<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\AtividadeController;
use App\Http\Controllers\LogAtividadeController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/atividades', [AtividadeController::class, 'index'])->name('atividades.index');
    Route::get('/atividades/nova', [AtividadeController::class, 'create'])->name('atividades.create');
    Route::post('/atividades', [AtividadeController::class, 'store'])->name('atividades.store');
    Route::delete('/atividades/{atividade}', [AtividadeController::class, 'destroy'])->name('atividades.destroy');

    Route::post('/atividades/{atividade}/concluir', [LogAtividadeController::class, 'store'])
        ->name('atividades.concluir');
});

require __DIR__.'/auth.php';
