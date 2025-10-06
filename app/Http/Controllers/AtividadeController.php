<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Atividade;
use Inertia\Inertia;

class AtividadeController extends Controller
{
    public function index()
    {
        $atividades = Atividade::where('user_id', auth()->id())
            ->orderBy('ativo', 'desc')
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Atividades/Index', [
            'atividades' => $atividades,
        ]);
    }

    public function create()
    {
        return Inertia::render('Atividades/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'nome' => 'required|string|max:255',
            'tipo' => 'required|in:habito,pontual',
            'pontos' => 'required|integer|min:0',
            'frequencia' => 'required|in:diario,semanal,mensal,unico',
            'prazo' => 'nullable|date',
        ]);

        Atividade::create([
            'user_id' => auth()->id(),
            'nome' => $request->nome,
            'descricao' => $request->descricao,
            'tipo' => $request->tipo,
            'pontos' => $request->pontos,
            'frequencia' => $request->frequencia,
            'prazo' => $request->prazo,
        ]);

        return redirect()->route('atividades.index')
            ->with('success', 'Atividade criada com sucesso!');
    }

    public function destroy(Atividade $atividade)
    {
        $this->authorize('delete', $atividade);

        $atividade->delete();

        return redirect()->back()->with('success', 'Atividade removida!');
    }
}
