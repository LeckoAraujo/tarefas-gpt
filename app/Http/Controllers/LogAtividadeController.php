<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\LogAtividade;
use App\Models\Atividade;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use App\Models\UsuarioConquista;
use App\Models\Conquista;
use App\Models\User;

class LogAtividadeController extends Controller
{
    public function store(Request $request, Atividade $atividade)
    {
        $request->validate([
            'observacao' => 'nullable|string|max:255',
        ]);

        $user = auth()->user();

        $jaConcluido = LogAtividade::where('atividade_id', $atividade->id)
            ->whereDate('data_conclusao', now()->toDateString())
            ->where('user_id', $user->id)
            ->exists();

        if ($jaConcluido) {
            return redirect()->back()->with('success', 'Você já concluiu essa atividade hoje ✅');
        }

        // Cria o log da conclusão
        LogAtividade::create([
            'atividade_id' => $atividade->id,
            'user_id' => $user->id,
            'data_conclusao' => now(),
            'pontos_recebidos' => $atividade->pontos,
            'observacao' => $request->observacao,
        ]);

        // Calcula os pontos totais
        $totalPontos = LogAtividade::where('user_id', $user->id)->sum('pontos_recebidos');

        // Verifica conquistas
        $conquistas = Conquista::all();
        $novas = [];

        foreach ($conquistas as $conquista) {
            $jaTem = DB::table('usuarios_conquistas')
                ->where('user_id', $user->id)
                ->where('conquista_id', $conquista->id)
                ->exists();

            if (!$jaTem && $totalPontos >= $conquista->pontos_necessarios) {
                DB::table('usuarios_conquistas')->insert([
                    'user_id' => $user->id,
                    'conquista_id' => $conquista->id,
                    'data_desbloqueio' => now(),
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
                $novas[] = $conquista->titulo;
            }
        }

        $msg = 'Atividade concluída! 🎉';
        if (count($novas)) {
            $msg .= ' Novas conquistas desbloqueadas: ' . implode(', ', $novas);
        }

        return redirect()->back()->with('success', $msg);
    }

    public function dashboard()
    {
        $user = auth()->user();

        $totalPontos = LogAtividade::where('user_id', $user->id)->sum('pontos_recebidos');

        $ultimosLogs = LogAtividade::with('atividade')
            ->where('user_id', $user->id)
            ->orderByDesc('data_conclusao')
            ->take(10)
            ->get();

        $conquistas = DB::table('usuarios_conquistas')
            ->join('conquistas', 'usuarios_conquistas.conquista_id', '=', 'conquistas.id')
            ->select('conquistas.titulo', 'conquistas.descricao', 'usuarios_conquistas.data_desbloqueio')
            ->where('usuarios_conquistas.user_id', $user->id)
            ->orderBy('conquistas.pontos_necessarios')
            ->get();

        return Inertia::render('Dashboard', [
            'auth' => ['user' => $user],
            'totalPontos' => $totalPontos,
            'ultimosLogs' => $ultimosLogs,
            'conquistas' => $conquistas,
        ]);
    }

    public function destroy(LogAtividade $log)
    {
        $user = auth()->user();

        // Segurança: só o dono pode desfazer
        if ($log->user_id !== $user->id) {
            abort(403);
        }

        // Remove o log
        $log->delete();

        // Recalcula pontos totais
        $totalPontos = LogAtividade::where('user_id', $user->id)->sum('pontos_recebidos');

        // Atualiza dashboard imediatamente (opcional)
        return redirect()->back()->with([
            'success' => 'Conclusão desfeita com sucesso 🔁',
            'totalPontos' => $totalPontos,
        ]);
    }
}
