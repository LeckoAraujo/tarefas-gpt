<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\LogAtividade;
use App\Models\Atividade;

class LogAtividadeController extends Controller
{
    public function store(Request $request, Atividade $atividade)
    {
        $request->validate([
            'observacao' => 'nullable|string',
        ]);

        LogAtividade::create([
            'atividade_id' => $atividade->id,
            'user_id' => auth()->id(),
            'data_conclusao' => now(),
            'pontos_recebidos' => $atividade->pontos,
            'observacao' => $request->observacao,
        ]);

        return redirect()->back()->with('success', 'Atividade concluída!');
    }
}
