"use client";

import { useState, useEffect } from 'react';
import AddButton from './AddButton';
import axios from 'axios';

type Visitor = {
    id: number;
    nombre: string;
    fechaHoraEntrada: string;
    fechaHoraSalida: string | null;
    apartamento_id: number;
    guardia_id: number;
};

type Apartamento = {
    id: number;
    numero: number;
};

type Guardia = {
    id: number;
    userName: string;
    rol: "administrador" | "guardia";
};

const VisitantesTable = () => {
    const [visitantes, setVisitantes] = useState<Visitor[]>([]);
    const [apartamentos, setApartamentos] = useState<Apartamento[]>([]);
    const [guardias, setGuardias] = useState<Guardia[]>([]);
    const [editandoId, setEditandoId] = useState<number | null>(null);
    const [visitanteEdit, setVisitanteEdit] = useState<Visitor | null>(null);

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/visitante/ver")
            .then((res) => {
                const uniqueVisitantes = Array.from(new Map((res.data as Visitor[]).map(visitor => [visitor.id, visitor])).values());
                setVisitantes(uniqueVisitantes);
            })
            .catch((err) => console.error("Error al cargar visitantes:", err));
        axios
            .get("http://localhost:5000/api/apartamento/ver")
            .then((res) => {
                setApartamentos(res.data as Apartamento[]);
                console.log("Apartamentos:", res.data);
            })
            .catch((err) => console.error("Error al cargar apartamentos:", err));

        axios
            .get("http://localhost:5000/api/usuario/ver")
            .then((res) => {
                if (Array.isArray(res.data)) {
                    const guardiasFiltrados = res.data.filter((g: Guardia) => g.rol === "guardia");
                    setGuardias(guardiasFiltrados);
                } else {
                    console.error("Error: La respuesta de la API no es un array", res.data);
                    setGuardias([]);
                }
            })
            .catch((err) => console.error("Error al cargar guardias:", err));
    }, []);

    const getApartamentoNumero = (id: number) => {
        const apartamento = apartamentos.find(a => a.id === id);
        return apartamento ? apartamento.numero : 'No asignado';
    };

    const getGuardiauserName = (id: number) => {
        const guardia1 = guardias.find(g => g.id === id );
        return guardia1 ? guardia1.userName : "No asignado";
    };

    const formatDate = (dateString: string | null) => {
        if (!dateString) return '---';
        return new Date(dateString).toLocaleString();
    };

    const formatDateForInput = (dateString: string | null) => {
        if (!dateString) return '';
        return dateString.includes('T') 
            ? dateString.slice(0, 16) 
            : new Date(dateString).toISOString().slice(0, 16);
    };

    const activateEdit = (visitante: Visitor) => {
        setEditandoId(visitante.id);
        setVisitanteEdit({...visitante});
    };

    const handleEdit = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        if (!visitanteEdit) return;
        setVisitanteEdit({ ...visitanteEdit, [e.target.name]: e.target.value });
    };

    const editVisitante = async (id: number) => {
        if (!visitanteEdit) return;

        try {
            const res = await axios.put(`http://localhost:5000/api/visitante/actualizar/${id}`, visitanteEdit);
            const updatedVisitante = res.data;
            setVisitantes(visitantes.map((v) => v.id === id ? updatedVisitante : v));
            
            setEditandoId(null);
            setVisitanteEdit(null);
        } catch (error) {
            console.error("Error al editar visitante", error);
            alert("Error al editar visitante");
        }
    };

    const addVisitante = async () => {
        try {
            const currentDate = new Date().toISOString();
            const newVisitante = {
                nombre: "Nuevo Visitante",
                fechaHoraEntrada: currentDate,  
                apartamento_id:  1,  
                guardia_id: 23  
            };
            console.log("Datos a enviar:", newVisitante);
            await axios.post("http://localhost:5000/api/visitante/registrar", newVisitante);

            const res = await axios.get("http://localhost:5000/api/visitante/ver");
            setVisitantes(res.data as Visitor[]);
        } catch (error) {
            console.error("Error al agregar visitante:", error);
            alert("Error al agregar visitante");
        }
    };

    const deleteVisitante = async (id: number) => {
            try {
                await axios.delete(`http://localhost:5000/api/visitante/eliminar/${id}`);
                setVisitantes(visitantes.filter(v => v.id !== id));
            } catch (error) {
                console.error("Error al eliminar visitante:", error);
                alert("Error al eliminar visitante");
            }
    };

    return (
        <div>
            <div className="text-white grid grid-cols-[5rem_1fr_1fr_1fr_1fr_1fr_1fr] bg-black uppercase text-sm font-semibold py-3 px-6 rounded-2xl m-2 text-center">
                <div>Id</div>
                <div>Nombre</div>
                <div>Fecha Entrada</div>
                <div>Fecha Salida</div>
                <div>Apartamento</div>
                <div>Guardia</div>
                <div>Funciones</div>
            </div>
            
            <div>
                {visitantes.map((visitante, index) => (
                    <div key={visitante.id ?? `visitante-${index}`} className='text-white grid grid-cols-[5rem_1fr_1fr_1fr_1fr_1fr_1fr] bg-black text-sm font-semibold py-3 px-6 rounded-2xl m-2 text-center'>
                        <div>{visitante.id}</div>
                        {editandoId === visitante.id && visitanteEdit ? (
                            <>
                                <input type="text" name="nombre" value={visitanteEdit.nombre} onChange={handleEdit} className="text-black" />
                                <input 
                                    type="datetime-local" 
                                    name="fechaHoraEntrada" 
                                    value={formatDateForInput(visitanteEdit.fechaHoraEntrada)} 
                                    onChange={handleEdit} 
                                    className="text-black" 
                                />
                                <input 
                                    type="datetime-local" 
                                    name="fechaHoraSalida" 
                                    value={formatDateForInput(visitanteEdit.fechaHoraSalida)} 
                                    onChange={handleEdit} 
                                    className="text-black" 
                                />
                                <select name="apartamento_id" value={visitanteEdit.apartamento_id} onChange={handleEdit} className="text-black">
                                    {apartamentos.map(apt => (
                                        <option key={apt.id} value={apt.id}>{apt.numero}</option>
                                    ))}
                                </select>
                                <select name="guardia_id" value={visitanteEdit.guardia_id} onChange={handleEdit} className="text-black">
                                    {guardias.map(g => (
                                        <option key={g.id} value={g.id}>{g.userName}</option>
                                    ))}
                                </select>
                                <button onClick={() => editVisitante(visitante.id)} className="bg-green-500 px-2 py-1 rounded w-fit m-auto">✔
                                </button>
                            </>
                        ) : (
                            <>
                                <div>{visitante.nombre}</div>
                                <div>{formatDate(visitante.fechaHoraEntrada)}</div>
                                <div>{formatDate(visitante.fechaHoraSalida)}</div>
                                <div>{getApartamentoNumero(visitante.apartamento_id)}</div>
                                <div>{getGuardiauserName(visitante.guardia_id)}</div>
                                <div className="flex justify-center gap-2">
                                    <button onClick={() => deleteVisitante(visitante.id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                            <path className='hover:fill-red-500' fill="#fff" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2zM18 4h-2.5l-.71-.71c-.18-.18-.44-.29-.7-.29H9.91c-.26 0-.52.11-.7.29L8.5 4H6c-.55 0-1 .45-1 1s.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1" />
                                        </svg>
                                    </button>
                                    <button onClick={() => activateEdit(visitante)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                            <path className='hover:fill-yellow-500' fill="#fff" d="M18.58 2.944a2 2 0 0 0-2.828 0L14.107 4.59l5.303 5.303l1.645-1.644a2 2 0 0 0 0-2.829zm-.584 8.363l-5.303-5.303l-8.835 8.835l-1.076 6.38l6.38-1.077z" />
                                        </svg>
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>
            <AddButton onClick={addVisitante} />
        </div>
    );
};

export default VisitantesTable;