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
    const [editedProperty, setEditedProperty] = useState<Apartamento | null>(null);

    useEffect(() => {
        axios.get("http://localhost:5000/api/apartamento/ver")
            .then((res) => setProperties(res.data))
            .catch((err) => console.error("Error al cargar Apartamentos:", err));
        axios.get("http://localhost:5000/api/propietario/ver")
            .then((res) => setOwners(res.data))
            .catch((err) => console.error("Error al cargar Propietarios:", err));
    }, []);

    const handleEdit = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        if (!editedProperty) return;

        const { name, value } = e.target;

        setEditedProperty(prev => ({
            ...prev!,
            [name]: name === "propietario_id" ? (value ? Number(value) : null) : Number(value)
        }));
    };

    const saveChanges = () => {
        if (!editedProperty) return;

        axios.put(`http://localhost:5000/api/apartamento/asignar`, editedProperty)
            .then(() => {
                setProperties(prev => prev.map((apt) => apt.id === editedProperty.id ? editedProperty : apt));
                setEditId(null);
                setEditedProperty(null);
            })
            .catch((err) => console.error("Error al actualizar apartamento:", err));
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
                {properties.map((property) => (
                    <div key={property.id} className='text-white grid grid-cols-[5rem_1fr_1fr_1fr] bg-black text-sm font-semibold py-3 px-6 rounded-2xl m-2 text-center'>
                        <div>{property.id}</div>
                        <div>
                            {editId === property.id ? (
                                <input
                                    type="number"
                                    name='numero'
                                    value={editedProperty?.numero || property.numero}
                                    onChange={handleEdit}
                                    className="text-black p-1 rounded"
                                />
                            ) : (
                                property.numero
                            )}
                        </div>
                        <div>
                            {editId === property.id ? (
                                <select
                                    name="propietario_id"
                                    value={editedProperty?.propietario_id ?? ""}
                                    onChange={handleEdit}
                                    className='text-black p-1 rounded'
                                >
                                    <option value="">Sin propietario</option>
                                    {owners.map((owner) => (
                                        <option key={owner.id} value={owner.id}>{owner.nombre}</option>
                                    ))}
                                </select>
                            ) : (
                                owners.find((owner) => owner.id === property.propietario_id)?.nombre || "Sin propietario"
                            )}
                        </div>
                        <div>
                            {editId === property.id ? (
                                <button onClick={saveChanges} className="bg-green-500 px-2 py-1 rounded">✔</button>
                            ) : (
                                <button onClick={() => { setEditId(property.id); setEditedProperty({ ...property }); }} className="bg-yellow-500 px-2 py-1 rounded">Editar</button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            <AddButton onClick={() => console.log("Agregar Propiedad")} />
        </div>
    );
};

export default TableProperties;
