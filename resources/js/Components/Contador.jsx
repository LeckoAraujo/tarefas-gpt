import React, { useState } from 'react';

export default function Contador() {
    const [contador, setContador] = useState(0);

    return (
        <div className="p-4 bg-gray-100 rounded-lg w-64 text-center">
            <p className="text-gray-700 mb-2">Você clicou <strong>{contador}</strong> vezes</p>
            <button
                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                onClick={() => setContador(contador + 1)}
            >
                Clique aqui
            </button>
        </div>
    );
}
