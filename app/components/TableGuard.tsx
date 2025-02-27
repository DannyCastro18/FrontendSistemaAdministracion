"use client";

import { useState, useEffect } from 'react';
import AddButton from './AddButton';
import axios from 'axios';

type Visitante = {
    id: number;
    nombre: string;
    fecha_ingreso: string;
    fecha_salida: string;
    apartamento: string;
    guardia: string;
}

const TableGuard = () => {
    const [visitors, setVisitors] = useState<Visitante[]>([]);
    const [editandoId, setEditandoId] = useState<number | null>(null);
    const [visitorEdit, setVisitorEdit] = useState<Visitante | null>(null);

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/visitante/ver")
            .then((res) => {
                const uniqueUsers = Array.from(new Map((res.data as Visitante[]).map(user => [user.id, user])).values());
                setVisitors(uniqueUsers);
            })
            .catch((err) => console.error("Error al cargar visitanteVisitantes:", err));
    }, []);

    const activateEdit = (usuario:Visitante) => {
        setEditandoId(usuario.id);
        setVisitorEdit({...usuario});
    }

    const handleEdit = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        if (!visitorEdit) return;
        setVisitorEdit({ ...visitorEdit, [e.target.name]: e.target.value });
    }

    const editVisitor = async (id: number) => {
        if (!visitorEdit) return;

        console.log("Enviando datos editados:", visitorEdit);
        try {
            const res = await axios.put(`http://localhost:5000/api/visitante/actualizar/${id}`, visitorEdit);
            console.log("Respuesta del servidor:", res.data);
            
            const updatedVisitante = res.data;
            setVisitors(visitors.map((visitante) => visitante.id === id ? updatedVisitante : visitante));
            
            setEditandoId(null);
            setVisitorEdit(null);
        } catch (error) {
            console.error("Error al editar visitante", error)
            alert("Error al editar visitante")
        }
    }

    const addVisitor = async () => {
        try {
            const newVisitor = {
                nombre: "Nuevo Visitante",
                fecha_ingreso: new Date().toISOString(),
                fecha_salida: new Date().toISOString(),
                apartamento: 100,
                guardia_id: 5
            };
            await axios.post("http://localhost:5000/api/usuario/registrar", newVisitor);
            const res = await axios.get("http://localhost:5000/api/usuario/ver");
            setVisitors(res.data as Visitante[]);
        } catch (error) {
            console.error("Error al agregar usuario:", error);
        }
    };

    return (
        <div>
            <div className="text-white grid grid-cols-[5rem_1fr_2fr_2fr_1fr_1fr_1fr] bg-black uppercase text-sm font-semibold py-3 px-6 rounded-2xl m-2 text-center">
                <div>Id</div>
                <div>Nombre</div>
                <div>Fecha y Hora de Ingreso</div>
                <div>fecha y Hora de Salida</div>
                <div>Apartamento</div>
                <div></div>
                <div>Guardia</div>
            </div>
            <div>
            {visitors.map((visitor, index) => (
                    <div key={visitor.id ?? `user-${index}`} className='text-white grid grid-cols-[5rem_1fr_1fr_1fr_1fr_1fr_1fr_1fr] bg-black text-sm font-semibold py-3 px-6 rounded-2xl m-2 text-center'>
                        <div>{visitor.id}</div>
                        {editandoId === visitor.id && visitorEdit ? (
                            <>
                                <input type="text" name="nombre" value={visitorEdit.nombre} onChange={handleEdit} className="text-black" />
                                <input type="datetime-local" name="fecha_ingreso" value={visitorEdit.fecha_ingreso} onChange={handleEdit} className="text-black" />
                                <input type="datetime-local" name="fecha_salida" value={visitorEdit.fecha_salida} onChange={handleEdit} className="text-black" />
                                <input type="text" name="apartamento" value={visitorEdit.apartamento} onChange={handleEdit} className="text-black" />
                                <input type="text" name="guardia" value={visitorEdit.guardia} onChange={handleEdit} className="text-black" />
                            </>
                        ) : (
                            <>
                                <div>{visitor.nombre}</div>
                                <div>{visitor.fecha_ingreso}</div>
                                <div>{visitor.fecha_salida}</div>
                                <div>{visitor.apartamento}</div>
                                <div>{visitor.guardia}</div>
                                <div>
                                <button onClick={() => activateEdit(visitor)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                        <path className='hover:fill-yellow-500' fill="#fff" d="M18.58 2.944a2 2 0 0 0-2.828 0L14.107 4.59l5.303 5.303l1.645-1.644a2 2 0 0 0 0-2.829zm-.584 8.363l-5.303-5.303l-8.835 8.835l-1.076 6.38l6.38-1.077z" />
                                    </svg>
                                </button>
                                <button onClick={() => editVisitor(visitor.id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 512 512">
                                        <path className='hover:fill-green-500' fill="#fff" d="M400 48H112a64.07 64.07 0 0 0-64 64v288a64.07 64.07 0 0 0 64 64h288a64.07 64.07 0 0 0 64-64V112a64.07 64.07 0 0 0-64-64m-35.75 138.29l-134.4 160a16 16 0 0 1-12 5.71h-.27a16 16 0 0 1-11.89-5.3l-57.6-64a16 16 0 1 1 23.78-21.4l45.29 50.32l122.59-145.91a16 16 0 0 1 24.5 20.58" />
                                    </svg>
                                </button>
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>
            <AddButton onClick={addVisitor} />
        </div>
    );
}
export default TableGuard;