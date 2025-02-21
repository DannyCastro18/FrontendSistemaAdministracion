import {useState, useEffect} from 'react';
import axios from 'axios';

const TableAdmin = () => {
    const [users, setUsers] = useState<
    { id: number; nombre: string; rol: string; estado: string; correo: string }[]
    >([]);

    useEffect(() => {
        axios
          .get("/api/users")
          .then((res) => setUsers(res.data))
          .catch((err) => console.error("Error al cargar usuarios:", err));
      }, []);

    const deleteUser = async (id: number) => {
        try{
            await axios.delete(`/api/users/${id}`);
            setUsers(users.filter(user => user.id !== id));
        }   catch (error) {
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
                    <div key={user.id} className='text-white grid grid-cols-[5rem_1fr_1fr_1fr_1fr_1fr] bg-black uppercase text-sm font-semibold py-3 px-6 rounded-2xl m-2 text-center'>
                        <div>{user.id}</div>
                        <div>{user.nombre}</div>
                        <div>{user.rol}</div>
                        <div className= {user.estado === "activo" ? "text-green-600" : "text-red-600"}>
                            {user.estado}
                        </div>
                        <div>{user.correo}</div>
                        

                    </div>
                ))}
            </div>
        </div>
        
    )
}

export default TableAdmin;