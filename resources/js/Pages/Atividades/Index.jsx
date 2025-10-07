import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';

export default function Index({ auth, atividades }) {
    const { delete: destroy, processing } = useForm();

    const handleDelete = (id) => {
        if (confirm('Tem certeza que deseja excluir esta atividade?')) {
            destroy(route('atividades.destroy', id));
        }
    };

    const { flash } = usePage().props;

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Atividades" />

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

            <div className="max-w-4xl mx-auto py-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Minhas Atividades</h1>
                    <Link
                        href={route('atividades.create')}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                    >
                        Nova Atividade
                    </Link>
                </div>

                {/* {flash && flash.success && (
                    <div className="mb-4 text-green-600 font-semibold">{flash.success}</div>
                )} */}

                {atividades.length === 0 ? (
                    <p className="text-gray-600">Nenhuma atividade cadastrada ainda.</p>
                ) : (
                    <table className="w-full bg-white rounded shadow">
                        <thead>
                            <tr className="text-left border-b bg-gray-100">
                                <th className="p-3">Nome</th>
                                <th className="p-3">Tipo</th>
                                <th className="p-3">Pontos</th>
                                <th className="p-3">Frequência</th>
                                <th className="p-3 text-center">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {atividades.map((a) => (
                                <tr key={a.id} className="border-b hover:bg-gray-50">
                                    <td className="p-3">{a.nome}</td>
                                    <td className="p-3 capitalize">{a.tipo}</td>
                                    <td className="p-3">{a.pontos}</td>
                                    <td className="p-3 capitalize">{a.frequencia}</td>
                                    <td className="p-3 text-center space-x-3">
                                        <button
                                            onClick={() => router.post(route('atividades.concluir', a.id))}
                                            className="text-green-600 hover:text-green-800"
                                        >
                                            Concluir
                                        </button>

                                        <button
                                            onClick={() => handleDelete(a.id)}
                                            disabled={processing}
                                            className="text-red-600 hover:text-red-800"
                                        >
                                            Excluir
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
