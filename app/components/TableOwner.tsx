"use client";

import { useEffect, useState } from "react";
import AddButton from './AddButton';
import axios from "axios";

interface Propietario {
  id: number;
  nombre: string;
  apellido: string;
  correo: string;
  telefono: string;
  apartamento: string;
  pagos: number;
}

export default function Propietarios() {
  const [propietarios, setPropietarios] = useState<Propietario[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/propietarios/ver")
      .then((response) => setPropietarios(response.data))
      .catch((error) => console.error("Error al obtener propietarios:", error));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Lista de Propietarios</h2>
      <div className="text-white grid grid-cols-[5rem_1fr_1fr_1fr_1fr_1fr_1fr] bg-black uppercase text-sm font-semibold py-3 px-6 rounded-2xl m-2 text-center">
        <div>Id</div>
        <div>Nombre</div>
        <div>Apellido</div>
        <div>Correo</div>
        <div>Teléfono</div>
        <div>Apartamento</div>
        <div>Pagos</div>
      </div>
      {propietarios.map((prop) => (
        <div
          key={prop.id}
          className="grid grid-cols-7 p-2 border-b border-gray-300"
        >
          <div>{prop.id}</div>
          <div>{prop.nombre}</div>
          <div>{prop.apellido}</div>
          <div>{prop.correo}</div>
          <div>{prop.telefono}</div>
          <div>{prop.apartamento}</div>
          <div>{prop.pagos}</div>
        </div>
      ))}
    </div>
  );
}
