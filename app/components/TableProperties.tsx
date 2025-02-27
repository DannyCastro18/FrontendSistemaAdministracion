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
    apellido: string;
};

const TableProperties = () => {
    const [properties, setProperties] = useState<Apartamento[]>([]);
    const [owners, setOwners] = useState<Propietario[]>([]);
    const [editId, setEditId] = useState<number | null>(null);
    const [propertiesEdit, setpropertiesEdit] = useState<Apartamento | null>(null);
    const [ownerSelected, setOwnerSelected] = useState<number | null>(null);

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/apartamento/ver")
            .then((res) => setProperties(res.data))
            .catch((err) => console.error("Error al cargar Apartamentos:", err));
        axios
            .get("http://localhost:5000/api/propietario/ver")
            .then((res) => setOwners(res.data))
            .catch((err) => console.error("Error al cargar Propietarios:", err));
    }, []);

    const handleEdit = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        if (!propertiesEdit) return;
        setpropertiesEdit({ ...propertiesEdit, [e.target.name]: Number(e.target.value) });
    }

    const assignOwner = (apartamentoId: number) => {
        if (!ownerSelected) return;

        axios.put(`http://localhost:5000/api/apartamento/asignar`, {
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
            }).catch((err) => console.error("Error al asignar propietario:", err));
    }

    // const listOwners = () => {
    //     axios.get("http://localhost:5000/api/propietarios/ver")
    //         .then((res) => setOwners(res.data))
    //         .catch((err) => console.error("Error al obtener propietarios:", err));
    // };


    const addProperties = async () => {
        try {
            const newProperty = {
                numero: 100,
                propietario_id: null,
            };
            await axios.post("http://localhost:5000/api/apartamento/registrar", newProperty);
            const res = await axios.get("http://localhost:5000/api/apartamento/ver");
            setProperties(res.data as Apartamento[]);
        } catch (error) {
            console.error("Error al agregar Apartamento", error);
        }
    };

    return (
        <div>
            <div className="text-white grid grid-cols-[5rem_1fr_1fr_1fr] bg-black uppercase text-sm font-semibold py-3 px-6 rounded-2xl m-2 text-center">
                <div>Id</div>
                <div>Número</div>
                <div>Propietario</div>
                <div>Funciones</div>
            </div>
            <div>
                {properties.map((properties, index) => (
                    <div key={properties.id ?? `properties-${index}`} className='text-white grid grid-cols-[5rem_1fr_1fr_1fr] bg-black text-sm font-semibold py-3 px-6 rounded-2xl m-2 text-center'>
                        <div>{properties.id}</div>
                        <div>
                            <input type="number" name='numero' value={properties.numero} onChange={handleEdit} className="text-black" />
                            {properties.propietario_id ? (
                                owners.find((owner) => owner.id === properties.propietario_id)?.nombre || "Sin propietario"
                            ) : (
                                editId === properties.id ? (
                                    <div className='grid grid-cols-[5rem_1fr_1fr]'>
                                        <select value={ownerSelected || ""} onChange={(e) => setOwnerSelected(Number(e.target.value))} className='text-black p-1 rounded  '>
                                            <option value="">Selecciona un propietario</option>
                                            {owners.map((owner) => (
                                                <option key={owner.id} value={owner.id}>
                                                    {owner.nombre}
                                                </option>))}
                                        </select>
                                        <div>
                                            <button onClick={() => assignOwner(properties.id)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 512 512">
                                                    <path className='hover:fill-green-500' fill="#fff" d="M400 48H112a64.07 64.07 0 0 0-64 64v288a64.07 64.07 0 0 0 64 64h288a64.07 64.07 0 0 0 64-64V112a64.07 64.07 0 0 0-64-64m-35.75 138.29l-134.4 160a16 16 0 0 1-12 5.71h-.27a16 16 0 0 1-11.89-5.3l-57.6-64a16 16 0 1 1 23.78-21.4l45.29 50.32l122.59-145.91a16 16 0 0 1 24.5 20.58" />
                                                </svg>
                                            </button>
                                            <button>
                                                
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <button onClick={() => setEditId(properties.id)}
                                        className="bg-yellow-500 px-2 py-1 rounded">Asignar</button>
                                )
                            )}
                        </div>
                    </div>
                ))}
            </div>
            <AddButton onClick={addProperties} />
        </div>
    )
}

export default TableProperties;