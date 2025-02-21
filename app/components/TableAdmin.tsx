"use client"; 

import { useState, useEffect } from 'react';
import AddButton from './AddButton';
import axios from 'axios';

const TableAdmin = () => {
    const [users, setUsers] = useState<
        { id: number; userName: string; rol: string; estado: string; correo: string }[]
    >([]);
    console.log(users);

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/usuario/ver")
            .then((res) => setUsers(res.data))
            .catch((err) => console.error("Error al cargar usuarios:", err));
    }, []);

    const addUser = async () => {
        try {
            await axios.post("/api/usuario/registrar");
            const res = await axios.get("/api/users");
            setUsers(res.data);
        } catch (error) {
            console.error("Error al agregar usuario:", error);
        }
    }

    const editUser = async (id: number) => {
        try {
            await axios.put(`/api/users/${id}`);
            setUsers(users.filter(user => user.id !== id));
        } catch (error) {
            console.error("Error al editar Usuario", error)
        }
    }

    const deleteUser = async (id: number) => {
        try {
            await axios.delete(`/api/users/${id}`);
            setUsers(users.filter(user => user.id !== id));
        } catch (error) {
            console.error("Error al eliminar usuario:", error);
        }
    };

    return (
        <div>
            <div className="text-white grid grid-cols-[5rem_1fr_1fr_1fr_1fr_1fr] bg-black uppercase text-sm font-semibold py-3 px-6 rounded-2xl m-2 text-center">
                <div>Id</div>
                <div>Nombre</div>
                <div>Rol</div>
                <div>Estado</div>
                <div>Correo</div>
                <div>Funciones</div>
            </div>
            <div>
                {users.map((user) => (
                    <div key={user.id} className='text-white grid grid-cols-[5rem_1fr_1fr_1fr_1fr_1fr] bg-black  text-sm font-semibold py-3 px-6 rounded-2xl m-2 text-center'>
                        <div>{user.id}</div>
                        <div>{user.userName}</div>
                        <div>{user.rol}</div>
                        <div className={user.estado === "activo" ? "text-green-600" : "text-red-600"}>
                            {user.estado}
                        </div>
                        <div>{user.correo}</div>
                        <div>
                            <button onClick={() => editUser(user.id)} className='hover:text-yellow-500'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                                    <path fill="#fff" d="M21.65 3.434a4.889 4.889 0 1 1 6.915 6.914l-.902.901l-6.914-6.914zM19.335 5.75L4.357 20.73a3.7 3.7 0 0 0-1.002 1.84l-1.333 6.22a1 1 0 0 0 1.188 1.188l6.22-1.333a3.7 3.7 0 0 0 1.84-1.002l14.98-14.98z" />
                                </svg>
                            </button>
                            <button onClick={() => deleteUser(user.id)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <path fill="#fff" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2zM18 4h-2.5l-.71-.71c-.18-.18-.44-.29-.7-.29H9.91c-.26 0-.52.11-.7.29L8.5 4H6c-.55 0-1 .45-1 1s.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1" />
                                </svg>
                            </button>
                        </div>


                    </div>
                ))}
            </div>
            <AddButton onClick={addUser} />
        </div>

    )
}

export default TableAdmin;