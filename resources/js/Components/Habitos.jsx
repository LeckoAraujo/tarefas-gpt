import React, { useState } from 'react';

export default function Habitos() {
    const [habitos, setHabitos] = useState([
        { id: 1, nome: 'Acordar cedo', concluido: false },
        { id: 2, nome: 'Fazer exercício', concluido: false },
        { id: 3, nome: 'Estudar React', concluido: false },
    ]);

    const toggleHabito = (id) => {
        const novosHabitos = habitos.map((h) =>
            h.id === id ? { ...h, concluido: !h.concluido } : h
        );
        setHabitos(novosHabitos);
    };

    const todosConcluidos = habitos.every((h) => h.concluido);

    return (
        <div className="mt-6 p-4 bg-white shadow rounded-lg w-80">
            <h3 className="font-semibold text-lg mb-3">Hábitos do dia</h3>
            <ul>
                {habitos.map((h) => (
                    <li key={h.id} className="flex items-center gap-2 mb-2">
                        <input
                            type="checkbox"
                            checked={h.concluido}
                            onChange={() => toggleHabito(h.id)}
                        />
                        <span
                            className={`${
                                h.concluido ? 'line-through text-gray-500' : ''
                            }`}
                        >
                            {h.nome}
                        </span>
                    </li>
                ))}
            </ul>

            {todosConcluidos && (
                <p className="mt-3 text-green-600 font-medium">
                    🎉 Todos os hábitos concluídos!
                </p>
            )}
        </div>
    );
}
