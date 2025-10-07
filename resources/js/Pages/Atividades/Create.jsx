import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Create({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        nome: '',
        descricao: '',
        tipo: 'habito',
        pontos: 10,
        frequencia: 'diario',
        prazo: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('atividades.store'));
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Nova Atividade" />

            <div className="max-w-2xl mx-auto py-8">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Nova Atividade</h1>

                <form onSubmit={submit} className="bg-white p-6 rounded shadow space-y-4">
                    <div>
                        <label className="block font-semibold text-gray-700">Nome</label>
                        <input
                            type="text"
                            value={data.nome}
                            onChange={(e) => setData('nome', e.target.value)}
                            className="w-full border-gray-300 rounded"
                        />
                        {errors.nome && <div className="text-red-500 text-sm">{errors.nome}</div>}
                    </div>

                    <div>
                        <label className="block font-semibold text-gray-700">Descrição</label>
                        <textarea
                            value={data.descricao}
                            onChange={(e) => setData('descricao', e.target.value)}
                            className="w-full border-gray-300 rounded"
                        />
                    </div>

                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="block font-semibold text-gray-700">Tipo</label>
                            <select
                                value={data.tipo}
                                onChange={(e) => setData('tipo', e.target.value)}
                                className="w-full border-gray-300 rounded"
                            >
                                <option value="habito">Hábito</option>
                                <option value="pontual">Atividade Pontual</option>
                            </select>
                        </div>

                        <div className="flex-1">
                            <label className="block font-semibold text-gray-700">Frequência</label>
                            <select
                                value={data.frequencia}
                                onChange={(e) => setData('frequencia', e.target.value)}
                                className="w-full border-gray-300 rounded"
                            >
                                <option value="diario">Diário</option>
                                <option value="semanal">Semanal</option>
                                <option value="mensal">Mensal</option>
                                <option value="unico">Único</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="block font-semibold text-gray-700">Pontos</label>
                            <input
                                type="number"
                                value={data.pontos}
                                onChange={(e) => setData('pontos', e.target.value)}
                                className="w-full border-gray-300 rounded"
                            />
                        </div>

                        <div className="flex-1">
                            <label className="block font-semibold text-gray-700">Prazo</label>
                            <input
                                type="datetime-local"
                                value={data.prazo}
                                onChange={(e) => setData('prazo', e.target.value)}
                                className="w-full border-gray-300 rounded"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-4 pt-4">
                        <Link
                            href={route('atividades.index')}
                            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
                        >
                            Cancelar
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            Salvar
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
