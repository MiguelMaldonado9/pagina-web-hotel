import React, { useState } from 'react';
import './styles/Styles.css';


function ConsultaDisponibilidad() {
    // Estados para los datos del formulario
    const [tipoHabitacion, setTipoHabitacion] = useState('');
    const [fechaEntrada, setFechaEntrada] = useState('');
    const [fechaSalida, setFechaSalida] = useState('');
    const [resultado, setResultado] = useState(null); // Estado para el resultado

    // Función que se ejecuta al enviar el formulario
    const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await fetch('http://localhost:3001/api/disponibilidad', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                tipoHabitacion: tipoHabitacion,
                fechaInicio: fechaEntrada,
                fechaFin: fechaSalida,
            }),
        });

        const data = await response.json();

        if (response.ok) {
            setResultado(data.disponibles);
        } else {
            console.error('Error en la respuesta del servidor:', data);
            setResultado(null);
        }

    } catch (error) {
        console.error('Error al consultar disponibilidad:', error);
        setResultado(null);
    }
};


    return (
        <div id='formulario-disponibilidad' className="formulario-disponibilidad">
            <h2>Consultar Disponibilidad</h2>
            <form onSubmit={handleSubmit}>
                <label>Tipo de habitación:</label>
                <select
                    value={tipoHabitacion}
                    onChange={(e) => setTipoHabitacion(e.target.value)}
                    required
                >
                    <option value="">Seleccionar</option>
                    <option value="Estándar">Estándar</option>
                    <option value="Doble">Doble</option>
                    <option value="Suite">Suite</option>
                </select>

                <label>Fecha de entrada:</label>
                <input
                    type="date"
                    value={fechaEntrada}
                    onChange={(e) => setFechaEntrada(e.target.value)}
                    required
                />

                <label>Fecha de salida:</label>
                <input
                    type="date"
                    value={fechaSalida}
                    onChange={(e) => setFechaSalida(e.target.value)}
                    required
                />

                <button type="submit">Consultar</button>
            </form>

            {/* Mostrar resultado */}
            {resultado !== null && (
                <div style={{ marginTop: '1rem', textAlign: 'center', fontWeight: 'bold' }}>
                    {resultado > 0
                        ? `Hay ${resultado} habitación(es) disponibles.`
                        : 'No hay habitaciones disponibles para ese tipo.'}
                </div>
            )}
        </div>
    );
}

export default ConsultaDisponibilidad;
