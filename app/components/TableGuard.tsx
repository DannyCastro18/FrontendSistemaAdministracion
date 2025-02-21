const TableGuard = () => {

    return (
        <div className="text-white grid grid-cols-[5rem_1fr_2fr_2fr_1fr_1fr] bg-black uppercase text-sm font-semibold py-3 px-6 rounded-2xl m-2 text-center">
            <div>Id</div>   
            <div>Nombre</div>
            <div>Fecha y Hora de Ingreso</div>
            <div>fecha y Hora de Salida</div>
            <div>Apartamento</div>
            <div>Guardia</div>
        </div>
    )
}

export default TableGuard;