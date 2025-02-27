"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const Login = () => {
    const [formData, setFormData] = useState({ correo: "", contraseña: "" });
    const [mensaje, setMensaje] = useState("");
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/usuario/inicioSesion", formData);
            setMensaje("Inicio de sesión exitoso");

            localStorage.setItem("token", response.data.token);
            setTimeout(() => {
                router.push("/admin/dashboard"); 
            }, 2000);
        } catch (error) {
            setMensaje("Error al iniciar sesión");
            console.error("Error al iniciar sesión", error);
        }
    };

    return (
        <section className="flex h-screen w-screen items-center justify-center bg-gray-900">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
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
                        className="w-full mt-6 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-semibold transition-all"
                    >
                        Iniciar Sesión
                    </button>

                    {mensaje && <p className="mt-3 text-center text-white">{mensaje}</p>}
                </form>
            </div>
        </section>
    );
};

export default Login;
