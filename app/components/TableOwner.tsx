"use client";

import { useEffect, useState } from "react";
import AddButton from './AddButton';
import axios from "axios";

type Pago = {
  id: number;
  monto: string;
  tipo: string;
}

type Apartamento = {
  id: number;
  numero: number;
}

type Propietario = {
  id: number;
  nombre: string;
  apellido: string;
  correo: string;
  telefono: string;
  admin_id: number;
  apartamentos: Apartamento[];
  pagos: Pago[];
}

export default function Propietarios() {
  const [propietarios, setPropietarios] = useState<Propietario[]>([]);
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [propEdit, setPropEdit] = useState<Propietario | null>(null);
  useEffect(() => {
    const fetchPropietarios = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/propietario/ver");
        setPropietarios(response.data);
      } catch (error) {
        console.error("Error al obtener propietarios:", error);
      }
    };
    fetchPropietarios();
  }, []);

  const activateEdit = (propietario: Propietario) => {
    setEditandoId(propietario.id);
    setPropEdit({ ...propietario });
  };

  const handleEdit = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (!propEdit) return;
    setPropEdit(prev => prev ? { ...prev, [e.target.name]: e.target.value } : null);
  };

  const editOwner = async (id: number) => {
    if (!propEdit) return;
    try {
      const res = await axios.put(`http://localhost:5000/api/propietario/actualizar/${id}`, propEdit);
      setPropietarios(prev => prev.map(prop => (prop.id === id ? { ...prop, ...res.data } : prop)));
      setEditandoId(null);
      setPropEdit(null);
    } catch (error) {
      console.error("Error al obtener propietarios:", (error as Error).message);
    }
  };

  const deleteOwner = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5000/api/propietario/eliminar/${id}`);
      setPropietarios(prev => prev.filter(prop => prop.id !== id));
    } catch (error) {
      console.error("Error al eliminar propietario:", error);
    }
  };

  const addOwner = async () => {
    try {
        const newUser = {
            nombre: "Nuevo",
            apellido: "Vecino 🤠",
            correo: "vecino@nuevo.com",
            telefono: "3000000000",
            admin_id: 2
        };
        await axios.post("http://localhost:5000/api/propietario/registrar", newUser);
        const res = await axios.get("http://localhost:5000/api/usuario/ver");
        setPropietarios(res.data as Propietario[]);
    } catch (error) {
        console.error("Error al agregar usuario:", error);
    }
};

  return (
    <div className="p-4">
      <div className="text-white grid grid-cols-[5rem_1fr_1fr_1fr_1fr_1fr_1fr_1fr] bg-black uppercase text-sm font-semibold py-3 px-6 rounded-2xl m-2 text-center">
        <div>Id</div>
        <div>Nombre</div>
        <div>Apellido</div>
        <div>Correo</div>
        <div>Teléfono</div>
        <div>Apartamento</div>
        <div>Pagos</div>
        <div>Funciones</div>
      </div>

      {propietarios.map((prop) => (
        <div
          key={prop.id}
          className="text-white grid grid-cols-[5rem_1fr_1fr_1fr_1fr_1fr_1fr_1fr] bg-black text-sm font-semibold py-3 px-6 rounded-2xl m-2 text-center"
        >
          <div>{prop.id}</div>
          {editandoId === prop.id && propEdit ? (
            <>
              {["nombre", "apellido", "correo", "telefono"].map((field) => (
                <input
                  key={field}
                  type={field === "correo" ? "email" : "text"}
                  name={field}
                  value={propEdit[field as keyof Propietario] as string}
                  onChange={handleEdit}
                  className="text-black px-2 w-40 h-8 py-1"
                />
              ))}
              <div>{prop.apartamentos.map((apto) => (<div key={apto.id}>#{apto.numero}</div>))}</div>
              <div>{prop.pagos.map((pago) => (<div key={pago.id}>{pago.tipo} - {pago.monto}</div>))}</div>
              <button onClick={() => editOwner(prop.id)}>💾</button>
            </>
          ) : (
            <>
              <div>{prop.nombre}</div>
              <div>{prop.apellido}</div>
              <div>{prop.correo}</div>
              <div>{prop.telefono}</div>
              <div>{prop.apartamentos?.map((apto) => (<div key={apto.id}>#{apto.numero}</div>))}</div>
              <div>{prop.pagos?.map((pago) => (<div key={pago.id}>{pago.tipo} - {pago.monto}</div>))}</div>
              <div>
                <button onClick={() => deleteOwner(prop.id)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                            <path className='hover:fill-red-500' fill="#fff" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2zM18 4h-2.5l-.71-.71c-.18-.18-.44-.29-.7-.29H9.91c-.26 0-.52.11-.7.29L8.5 4H6c-.55 0-1 .45-1 1s.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1" />
                                        </svg>
                </button>
                <button onClick={() => activateEdit(prop)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                            <path className='hover:fill-yellow-500' fill="#fff" d="M18.58 2.944a2 2 0 0 0-2.828 0L14.107 4.59l5.303 5.303l1.645-1.644a2 2 0 0 0 0-2.829zm-.584 8.363l-5.303-5.303l-8.835 8.835l-1.076 6.38l6.38-1.077z" />
                                        </svg>
                </button>
              </div>
            </>
          )}
        </div>
      ))}

      <AddButton onClick={addOwner} />
    </div>
  );
}
