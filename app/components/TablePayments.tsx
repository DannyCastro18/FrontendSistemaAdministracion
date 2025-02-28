"use client";

import { useState, useEffect } from 'react';
import AddButton from './AddButton';
import axios from 'axios';

type Pago = {
    id: number;
    monto: number;
    tipo: "servicios" | "multa" | "arriendo";
    propietario_id: number | null;
};

type Propietario = {
    id: number;
    nombre: string;
    apellido: string;
};

const TablePayments = () => {
    const [pagos, setPagos] = useState<Pago[]>([]);
    const [owners, setOwners] = useState<Propietario[]>([]);
    const [editId, setEditId] = useState<number | null>(null);
    const [editedPago, setEditedPago] = useState<Pago | null>(null);

    useEffect(() => {
        axios.get('http://localhost:5000/api/pago/obtener')
            .then(response => setPagos(response.data))
            .catch(error => console.log("Error al cargar pagos:", error));

        axios.get('http://localhost:5000/api/propietario/ver')
            .then(response => setOwners(response.data))
            .catch(error => console.log("Error al cargar propietarios:", error));
    }, []);

    const handleEdit = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        if (!editedPago) return;
        setEditedPago({ ...editedPago, [e.target.name]: e.target.value });
    };

    const saveChanges = (id: number) => {
        if (!editedPago) return;
        axios.put(`http://localhost:5000/api/pago/editar/${id}`, editedPago)
            .then(() => {
                setPagos((prev) => prev.map((pago) => pago.id === id ? editedPago : pago));
                setEditId(null);
                setEditedPago(null);
            })
            .catch((err) => console.error("Error al actualizar pago:", err));
    };

    const addPayment = async () => {
        try {
            const newPayment = {
                "monto": "100000",
                "tipo": "multa",
                "propietario_id": 25
              }
            await axios.post("http://localhost:5000/api/pago/registrar", newPayment);
            const res = await axios.get("http://localhost:5000/api/pago/obtener");
            setPagos(res.data as Pago[]);
        } catch (error) {
            console.error("Error al agregar pago:", error);
        }
    };

    return (
        <div>
            <div className="text-white grid grid-cols-[5rem_1fr_1fr_1fr_1fr] bg-black uppercase text-sm font-semibold py-3 px-6 rounded-2xl m-2 text-center">
                <div>Id</div>
                <div>Monto</div>
                <div>Tipo</div>
                <div>Propietario</div>
                <div>Funciones</div>
            </div>
            <div>
                {pagos.map(pago => (
                    <div key={pago.id} className='text-white grid grid-cols-[5rem_1fr_1fr_1fr_1fr] bg-black text-sm font-semibold py-3 px-6 rounded-2xl m-2 text-center'>
                        <div>{pago.id}</div>
                        <div>
                            {editId === pago.id ? (
                                <input type="number" name='monto' value={editedPago?.monto || pago.monto} onChange={handleEdit} className="text-black p-1 rounded" />
                            ) : (
                                pago.monto
                            )}
                        </div>
                        <div>
                            {editId === pago.id ? (
                                <select name='tipo' value={editedPago?.tipo || pago.tipo} onChange={handleEdit} className="text-black p-1 rounded">
                                    <option value="servicios">Servicios</option>
                                    <option value="multa">Multa</option>
                                    <option value="arriendo">Arriendo</option>
                                </select>
                            ) : (
                                pago.tipo
                            )}
                        </div>
                        <div>
                            {editId === pago.id ? (
                                <select name="propietario_id" value={editedPago?.propietario_id || ""} onChange={handleEdit} className='text-black p-1 rounded'>
                                    <option value="">Selecciona un propietario</option>
                                    {owners.map((owner) => (
                                        <option key={owner.id} value={owner.id}>{owner.nombre}</option>
                                    ))}
                                </select>
                            ) : (
                                owners.find(owner => owner.id === pago.propietario_id)?.nombre || "Sin propietario"
                            )}
                        </div>
                        <div>
                            {editId === pago.id ? (
                                <button onClick={() => saveChanges(pago.id)} className="bg-green-500 px-2 py-1 rounded">✔</button>
                            ) : (
                                <button onClick={() => { setEditId(pago.id); setEditedPago(pago); }} >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                        <path className='hover:fill-yellow-500' fill="#fff" d="M18.58 2.944a2 2 0 0 0-2.828 0L14.107 4.59l5.303 5.303l1.645-1.644a2 2 0 0 0 0-2.829zm-.584 8.363l-5.303-5.303l-8.835 8.835l-1.076 6.38l6.38-1.077z" />
                                    </svg>
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            <AddButton onClick={addPayment} />
        </div>
    );
};

export default TablePayments;
