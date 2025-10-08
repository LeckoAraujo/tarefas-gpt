import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, router } from '@inertiajs/react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CheckCircle2, Clock, Star } from 'lucide-react';

export default function Dashboard({ auth, totalPontos, ultimoslogs, conquistas, dadosGrafico, atividadesHoje }) {
    const { flash } = usePage().props;

    const desfazerConclusao = (id) => {
        if (confirm('Deseja desfazer esta conclusão?')) {
            router.delete(route('atividades.desfazer', id));
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard" />

            {/* Mensagem de sucesso */}
            {flash?.success && (
                <div className="mb-4 px-4 py-2 bg-green-100 text-green-700 rounded border border-green-200">
                    {flash.success}
                </div>
            )}

            {/* Cards superiores */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
                <Card title="Pontos Totais" icon={<Star className="text-yellow-500" />} value={`${totalPontos} pts`} />
                <Card title="Conquistas" icon={<CheckCircle2 className="text-green-500" />} value={conquistas.length} />
                <Card title="Atividades Hoje" icon={<Clock className="text-blue-500" />} value={atividadesHoje.length} />
            </div>

            {/* Gráfico */}
            <div className="bg-white shadow rounded-lg p-6 mb-8">
                <h2 className="text-lg font-semibold mb-4">Progresso semanal</h2>
                <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={dadosGrafico}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="dia" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="atividades" fill="#3B82F6" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Atividades do dia */}
            <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-lg font-semibold mb-4">Atividades de hoje</h2>
                <ul className="divide-y divide-gray-200">
                    {atividadesHoje.map((a) => (
                        <li key={a.id} className="py-3 flex justify-between items-center">
                            <div>
                                <p className={`font-medium ${a.concluida ? 'text-green-600 line-through' : 'text-gray-800'}`}>
                                    {a.nome}
                                </p>
                                <p className="text-sm text-gray-500">{a.pontos} pts</p>
                            </div>
                            <div>
                                {a.concluida ? (
                                    <button
                                        onClick={() => desfazerConclusao(a.id)}
                                        className="text-red-500 hover:text-red-700 text-sm"
                                    >
                                        Desfazer
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => router.post(route('atividades.concluir', a.id))}
                                        className="text-blue-600 hover:text-blue-800 text-sm"
                                    >
                                        Concluir
                                    </button>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </AuthenticatedLayout>
    );
}

function Card({ title, icon, value }) {
    return (
        <div className="bg-white shadow rounded-lg p-6 flex items-center justify-between">
            <div>
                <h3 className="text-sm text-gray-500">{title}</h3>
                <p className="text-2xl font-bold text-gray-800">{value}</p>
            </div>
            <div className="p-3 bg-gray-100 rounded-full">{icon}</div>
        </div>
    );
}
