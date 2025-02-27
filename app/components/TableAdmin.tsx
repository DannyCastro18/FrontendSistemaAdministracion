"use client";

import { useState, useEffect } from 'react';
import AddButton from './AddButton';    
import axios from 'axios';

type Usuario = {
    id: number;
    userName: string;
    rol: "administrador" | "guardia";
    estado: "activo" | "inactivo";
    correo: string;
    password: string;
};

const TableAdmin = () => {
    const [users, setUsers] = useState<Usuario[]>([]);
    const [editandoId, setEditandoId] = useState<number | null>(null);
    const [usuarioEdit, setUsuarioEdit] = useState<Usuario|null>(null);

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/usuario/ver")
            .then((res) => {
                const uniqueUsers = Array.from(new Map((res.data as Usuario[]).map(user => [user.id, user])).values());
                setUsers(uniqueUsers);
            })
            .catch((err) => console.error("Error al cargar usuarios:", err));
    }, []);


    const activateEdit = (usuario:Usuario) => {
        setEditandoId(usuario.id);
        setUsuarioEdit({...usuario});
    }

    const handleEdit = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        if (!usuarioEdit) return;
        setUsuarioEdit({ ...usuarioEdit, [e.target.name]: e.target.value });
    }

    const editUser = async (id: number) => {
        if (!usuarioEdit) return;

        console.log("Enviando datos editados:", usuarioEdit);
        try {
            const res = await axios.put(`http://localhost:5000/api/usuario/actualizar/${id}`, usuarioEdit);
            console.log("Respuesta del servidor:", res.data);
            
            const updatedUser = res.data;
            setUsers(users.map((user) => user.id === id ? updatedUser : user));
            
            setEditandoId(null);
            setUsuarioEdit(null);
        } catch (error) {
            console.error("Error al editar Usuario", error)
            alert("Error al editar Usuario")
        }
    }

    const addUser = async () => {
        try {
            const newUser = {
                userName: "Nuevo Usuario",
                password: "123",
                rol: "administrador",
                estado: "activo",
                correo: "nuevo@correo.com"
            };
            await axios.post("http://localhost:5000/api/usuario/registrar", newUser);
            const res = await axios.get("http://localhost:5000/api/usuario/ver");
            setUsers(res.data as Usuario[]);
        } catch (error) {
            console.error("Error al agregar usuario:", error);
        }
    };

    const deleteUser = async (id: number) => {
        try {
            await axios.delete(`http://localhost:5000/api/usuario/eliminar/${id}`);
            setUsers(users.filter(user => user.id !== id));
        } catch (error) {
            console.error("Error al eliminar usuario:", error);
        }
    };

    return (
        <div>
            <div className="text-white grid grid-cols-[5rem_1fr_1fr_1fr_1fr_1fr_1fr] bg-black uppercase text-sm font-semibold py-3 px-6 rounded-2xl m-2 text-center">
                <div>Id</div>
                <div>Nombre</div>
                <div>Rol</div>
                <div>Estado</div>
                <div>Correo</div>
                <div>Contraseña</div>
                <div>Funciones</div>
            </div>
            <div>
                {users.map((user, index) => (
                    <div key={user.id ?? `user-${index}`} className='text-white grid grid-cols-[5rem_1fr_1fr_1fr_1fr_1fr_1fr] bg-black text-sm font-semibold py-3 px-6 rounded-2xl m-2 text-center'>
                        <div>{user.id}</div>
                        {editandoId === user.id && usuarioEdit ? (
                            <>
                                <input type="text" name="userName" value={usuarioEdit.userName} onChange={handleEdit} className="text-black" />
                                <select name="rol" value={usuarioEdit.rol} onChange={handleEdit} className="text-black">
                                    <option value="administrador">Administrador</option>
                                    <option value="guardia">Guardia</option>
                                </select>
                                <select name="estado" value={usuarioEdit.estado} onChange={handleEdit} className="text-black">
                                    <option value="activo">Activo</option>
                                    <option value="inactivo">Inactivo</option>
                                </select>
                                <input type="email" name="correo" value={usuarioEdit.correo} onChange={handleEdit} className="text-black" />
                                <input type="password" name="password" value={usuarioEdit.password} onChange={handleEdit} className="text-black" />
                                <button onClick={() => editUser(user.id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 512 512">
                                        <path className='hover:fill-green-500' fill="#fff" d="M400 48H112a64.07 64.07 0 0 0-64 64v288a64.07 64.07 0 0 0 64 64h288a64.07 64.07 0 0 0 64-64V112a64.07 64.07 0 0 0-64-64m-35.75 138.29l-134.4 160a16 16 0 0 1-12 5.71h-.27a16 16 0 0 1-11.89-5.3l-57.6-64a16 16 0 1 1 23.78-21.4l45.29 50.32l122.59-145.91a16 16 0 0 1 24.5 20.58" />
                                    </svg>
                                </button>
                            </>
                        ) : (
                            <>
                                <div>{user.userName}</div>
                                <div>{user.rol}</div>
                                <div className={user.estado === "activo" ? "text-green-600" : "text-red-600"}>{user.estado}</div>
                                <div>{user.correo}</div>
                                <div>{user.password}</div>
                                <div>
                                    <button onClick={() => deleteUser(user.id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                            <path className='hover:fill-red-500' fill="#fff" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2zM18 4h-2.5l-.71-.71c-.18-.18-.44-.29-.7-.29H9.91c-.26 0-.52.11-.7.29L8.5 4H6c-.55 0-1 .45-1 1s.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1" />
                                        </svg>
                                    </button>
                                    <button onClick={() => activateEdit(user)}>
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
            <AddButton onClick={addUser} />
        </div>
    )
}

export default TableAdmin;