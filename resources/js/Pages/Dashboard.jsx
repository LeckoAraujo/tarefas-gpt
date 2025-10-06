import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Saudacao from '@/Components/Saudacao';
import Contador from '@/Components/Contador';
import Habitos from '@/Components/Habitos';

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="p-6 text-gray-900 flex flex-col items-center">
                <Saudacao nome={auth.user.name} />
                <Contador />
                <Habitos />
                <p className="mt-2 text-gray-600">Você está logado e aprendendo React dentro do Laravel 🎯</p>
            </div>
        </AuthenticatedLayout>
    );
}
