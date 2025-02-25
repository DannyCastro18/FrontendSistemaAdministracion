"use client";

import { useState, useEffect } from 'react';
import AddButton from './AddButton';
import axios from 'axios';

type Apartamento = {
    id: number;
    numero: number;
    propietario_id: number | null;
};

type Propietario = {
    id: number;
    nombre: string;
};

const TableProperties = () => {
    const [properties, setProperties] = useState<Apartamento[]>([]);
    const [owners, setOwners] = useState<Propietario[]>([]);
    const [editId, setEditId] = useState<number | null>(null);
    const [ownerSelected, setOwnerSelected] = useState<number | null>(null);

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/apartamento/ver")
            .then((res) => setProperties(res.data))
            .catch((err) => console.error("Error al cargar Propietarios:", err));
    }, []);

    const listOwners = () => {
        axios.get("http://localhost:5000/api/propietarios/ver")
            .then((res) => setOwners(res.data))
            .catch((err) => console.error("Error al obtener propietarios:", err));
    };

    const assignOwner = (apartamentoId: number) => {
        if (!ownerSelected) return;

        axios.put(`http://localhost:5000/api/apartamentos/${apartamentoId}`, {
            propietario_id: ownerSelected,
        })
            .then(() => {
                setProperties((prev) =>
                    prev.map((apto) =>
                        apto.id === apartamentoId ? { ...apto, propietario_id: ownerSelected } : apto
                    )
                );
                setEditId(null);
                setOwnerSelected(null);
            })
            .catch((err) => console.error("Error al asignar propietario:", err));
    };

    const addProperties = () => {
        axios.post("http://localhost:5000/api/apartamentos", { numero: properties.length + 1 })
            .then((res) => setProperties([...properties, res.data]))
            .catch((err) => console.error("Error al agregar apartamento:", err));
    };

    return (
        <div>
            <div className="text-white grid grid-cols-[5rem_1fr_1fr_1fr] bg-black uppercase text-sm font-semibold py-3 px-6 rounded-2xl m-2 text-center">
                <div>Id</div>
                <div>Número</div>
                <div>Propietario</div>
                <div></div>
            </div>
            
        </div>
    )
}

export default TableProperties;