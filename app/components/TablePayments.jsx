"use client";

import { useState, useEffect } from 'react';
import AddButton from './AddButton';
import axios from 'axios';
import { type } from 'os';

// type Pago = {
//     id: number,
//     monto: number,
//     tipo: string,
//     propietario: number
// }

const TablePayments = () => {
    // const [pagos, setPagos] = useState < Pago[] > ([]);

    useEffect(() => {
        axios.get('http://localhost:5000/pago/obtener')
            .then(response => {
                setPagos(response.data);
            })
            .catch(error => {
                console.log(error);
            })

        axios.post('http://localhost:5000/pago/registrar'), {
            monto: 100,
            tipo: 'servicios',
            propietario_id: 'No asignado'
        }
    });

    return (
        <div>
            <div className="text-white grid grid-cols-[5rem_1fr_1fr_1fr] bg-black uppercase text-sm font-semibold py-3 px-6 rounded-2xl m-2 text-center">
                <div>Id</div>
                <div>Monto</div>
                <div>Tipo</div>
                <div>Propietario</div>
            </div>
            {/* <div>
                {pagos.map(pago => (
                ))}
            </div> */}
        </div>
    )
}

export default TablePayments;