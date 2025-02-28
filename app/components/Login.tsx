"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const Login = () => {
    const [formData, setFormData] = useState({ correo: "", contraseña: "" });
    const [mensaje, setMensaje] = useState("");
    const [cargando, setCargando] = useState(false);
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setCargando(true);
        setMensaje("");
    
        try {
            type UsuarioResponse = {
                token: string;
                usuario: {
                    id: number;
                    correo: string;
                    rol: "administrador" | "guardia"; 
                };
            }
    
            const response = await axios.post<UsuarioResponse>("http://localhost:5000/api/usuario/inicioSesion", formData);
            const { token, usuario } = response.data;
            console.log("Usuario:", usuario);
    
            localStorage.setItem("token", token);
            localStorage.setItem("rol", usuario.rol);
    
            setMensaje("Inicio de sesión exitoso");
    
            if (usuario.rol === "administrador") {
                router.push("/admin/dashboard");
            } else if (usuario.rol === "guardia") {
                router.push("/guardia/dashboard");
            } else {
                setMensaje("Rol no válido");
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                setMensaje(error.response.data.message || "Error al iniciar sesión");
            } else {
                setMensaje("Error inesperado al iniciar sesión");
            }
            console.error("Error:", error);
        } finally {
            setCargando(false);
        }
    };
    

    return (
        <section  style={{ backgroundImage: "url('/img/fondo2.jpg')" }}  className="flex h-screen w-screen items-center justify-center bg-cover bg-center ">
            <div className="bg-black p-8 rounded-lg shadow-lg w-96">
                <h1 className="text-2xl font-bold text-white text-center">Login</h1>
                <form onSubmit={handleSubmit} className="mt-4">
                    <label className="block text-gray-300" htmlFor="correo">
                        Email
                    </label>
                    <input
                        className="w-full mt-2 p-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        type="email"
                        name="correo"
                        id="correo"
                        placeholder="Tu correo"
                        value={formData.correo}
                        onChange={handleChange}
                        required
                    />

                    <label className="block text-gray-300 mt-4" htmlFor="contraseña">
                        Contraseña
                    </label>
                    <input
                        className="w-full mt-2 p-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        type="password"
                        name="contraseña"
                        id="contraseña"
                        placeholder="Tu contraseña"
                        value={formData.contraseña}
                        onChange={handleChange}
                        required
                    />

                    <button
                        type="submit"
                        className={`w-full mt-6 py-2 rounded-lg font-semibold transition-all ${
                            cargando ? "bg-gray-500 cursor-not-allowed" : "bg-yellow-500 hover:bg-yellow-600 text-white"
                        }`}
                        disabled={cargando}
                    >
                        {cargando ? "Cargando..." : "Iniciar Sesión"}
                    </button>

                    {mensaje && <p className="mt-3 text-center text-white">{mensaje}</p>}
                </form>
            </div>
        </section>
    );
};

export default Login;
