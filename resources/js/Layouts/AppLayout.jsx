import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { Menu, X, LogOut, Trophy, ListTodo, LayoutDashboard } from 'lucide-react';

export default function AppLayout({ children }) {
    const { auth } = usePage().props;
    const user = auth.user;
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen bg-gray-100 overflow-hidden">
            {/* Sidebar para desktop */}
            <aside className="hidden md:flex w-64 bg-gradient-to-b from-blue-700 to-blue-900 text-white flex-col">
                <div className="p-6 text-2xl font-bold tracking-wide">🎮 HabitXP</div>
                <nav className="flex-1 px-4 space-y-2">
                    <NavItem href={route('dashboard')} icon={<LayoutDashboard size={18} />} label="Dashboard" />
                    <NavItem href={route('atividades.index')} icon={<ListTodo size={18} />} label="Atividades" />
                    {/* <NavItem href={route('conquistas.index')} icon={<Trophy size={18} />} label="Conquistas" /> */}
                </nav>
                <Footer user={user} />
            </aside>

            {/* Sidebar mobile */}
            {sidebarOpen && (
                <div className="fixed inset-0 z-50 flex">
                    {/* Fundo escurecido */}
                    <div
                        className="fixed inset-0 bg-black/50"
                        onClick={() => setSidebarOpen(false)}
                    ></div>

                    <aside className="relative w-64 bg-gradient-to-b from-blue-700 to-blue-900 text-white flex flex-col z-50">
                        <div className="p-6 text-2xl font-bold flex justify-between items-center">
                            🎮 HabitXP
                            <button onClick={() => setSidebarOpen(false)}>
                                <X size={24} />
                            </button>
                        </div>
                        <nav className="flex-1 px-4 space-y-2">
                            <NavItem
                                href={route('dashboard')}
                                icon={<LayoutDashboard size={18} />}
                                label="Dashboard"
                                onClick={() => setSidebarOpen(false)}
                            />
                            <NavItem
                                href={route('atividades.index')}
                                icon={<ListTodo size={18} />}
                                label="Atividades"
                                onClick={() => setSidebarOpen(false)}
                            />
                            {/* <NavItem
                                href={route('conquistas.index')}
                                icon={<Trophy size={18} />}
                                label="Conquistas"
                                onClick={() => setSidebarOpen(false)}
                            /> */}
                        </nav>
                        <Footer user={user} />
                    </aside>
                </div>
            )}

            {/* Conteúdo principal */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <header className="flex items-center justify-between bg-white shadow px-4 py-3 md:hidden">
                    <button onClick={() => setSidebarOpen(true)} className="text-blue-700">
                        <Menu size={28} />
                    </button>
                    <span className="font-semibold text-gray-700">HabitXP</span>
                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="text-sm text-red-500 hover:text-red-700"
                    >
                        Sair
                    </Link>
                </header>

                <main className="flex-1 p-6 overflow-y-auto">{children}</main>
            </div>
        </div>
    );
}

function NavItem({ href, icon, label, onClick }) {
    const isActive = route().current(href);
    return (
        <Link
            href={href}
            onClick={onClick}
            className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
                isActive
                    ? 'bg-blue-800 text-white shadow-inner'
                    : 'text-blue-100 hover:bg-blue-800 hover:text-white'
            }`}
        >
            {icon}
            <span>{label}</span>
        </Link>
    );
}

function Footer({ user }) {
    return (
        <div className="p-4 border-t border-blue-800 flex items-center justify-between">
            <span className="text-sm">{user?.name}</span>
            <Link
                href={route('logout')}
                method="post"
                as="button"
                className="flex items-center gap-1 text-red-300 hover:text-white text-sm"
            >
                <LogOut size={16} /> Sair
            </Link>
        </div>
    );
}
