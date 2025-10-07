import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, router } from '@inertiajs/react';

export default function Dashboard({ auth, totalPontos, ultimosLogs, conquistas }) {
    const metaDiaria = 100;
    const progresso = Math.min((totalPontos / metaDiaria) * 100, 100);

    const desfazerConclusao = (id) => {
        if (confirm('Deseja desfazer esta conclusão?')) {
            router.delete(route('atividades.desfazer', id));
        }
    };

    const { flash } = usePage().props;

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard" />

            {flash?.success && (
                <div className="mb-4 px-4 py-2 bg-green-100 text-green-700 rounded border border-green-200">
                    {flash.success}
                </div>
            )}

            {flash?.error && (
                <div className="mb-4 px-4 py-2 bg-red-100 text-red-700 rounded border border-red-200">
                    {flash.error}
                </div>
            )}

            <div className="max-w-4xl mx-auto py-10 space-y-8">
                {/* Pontuação */}
                <div className="bg-white shadow rounded p-6">
                    <h2 className="text-xl font-semibold mb-3">Pontuação Total</h2>
                    <p className="text-4xl font-bold text-blue-600">{totalPontos} pts</p>

                    <div className="mt-4">
                        <div className="w-full bg-gray-200 rounded-full h-4">
                            <div
                                className="bg-blue-600 h-4 rounded-full transition-all duration-500"
                                style={{ width: `${progresso}%` }}
                            ></div>
                        </div>
                        <p className="text-sm text-gray-500 mt-2">
                            Progresso diário: {progresso.toFixed(0)}% de {metaDiaria} pts
                        </p>
                    </div>
                </div>

                {/* Conquistas desbloqueadas */}
                <div className="bg-white shadow rounded p-6">
                    <h2 className="text-xl font-semibold mb-3">Conquistas Desbloqueadas</h2>

                    {conquistas.length === 0 ? (
                        <p className="text-gray-600">Nenhuma conquista desbloqueada ainda.</p>
                    ) : (
                        <ul className="grid md:grid-cols-2 gap-4">
                            {conquistas.map((c, i) => (
                                <li
                                    key={i}
                                    className="p-4 border rounded bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100"
                                >
                                    <h3 className="font-semibold text-blue-700">{c.titulo}</h3>
                                    <p className="text-gray-700 text-sm">{c.descricao}</p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        Desbloqueado em{' '}
                                        {new Date(c.data_desbloqueio).toLocaleDateString('pt-BR')}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Logs recentes */}
                <div className="bg-white shadow rounded p-6">
                    <h2 className="text-xl font-semibold mb-3">Últimas atividades concluídas</h2>
                    {ultimosLogs.length === 0 ? (
                        <p className="text-gray-600">Nenhuma atividade concluída ainda.</p>
                    ) : (
                        <ul className="divide-y divide-gray-200">
                            {ultimosLogs.map((log) => (
                                <li key={log.id} className="py-3 flex justify-between items-center">
                                    <div>
                                        <p className="font-medium text-gray-800">
                                            {log.atividade?.nome}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            {new Date(log.data_conclusao).toLocaleString()}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-green-600 font-semibold">
                                            +{log.pontos_recebidos} pts
                                        </span>
                                        <button
                                            onClick={() => desfazerConclusao(log.id)}
                                            className="text-red-500 hover:text-red-700 text-sm"
                                        >
                                            Desfazer
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
