import React, { useEffect, useState } from 'react';
import banner from '../img/banner2.jpg'
import '../components/styles/Styles.css';

function ConsultarReserva() {
    const [reservas, setReservas] = useState([]);
    const [error, setError] = useState(null);

    // Estados para filtros
    const [filtroNombre, setFiltroNombre] = useState('');
    const [filtroTipo, setFiltroTipo] = useState('');
    const [filtroFecha, setFiltroFecha] = useState('');

    // Cargar reservas al montar el componente
    useEffect(() => {
        fetchReservas();
    }, []);

    const fetchReservas = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/reservas');
            const data = await response.json();
            setReservas(data);
        } catch (err) {
            setError('Error al cargar las reservas');
            console.error(err);
        }
    };

    // Función para filtrar reservas según criterios
    const reservasFiltradas = reservas.filter((reserva) => {
        const nombreMatch = reserva.nombre_cliente.toLowerCase().includes(filtroNombre.toLowerCase());
        const tipoMatch = filtroTipo === '' || reserva.tipo_habitacion === filtroTipo;
        
        // Si filtroFecha está vacío, no filtra por fecha
        // Si no, verifica si fecha_inicio o fecha_fin coincide con filtroFecha
        const fechaMatch = filtroFecha === '' || 
            reserva.fecha_inicio.startsWith(filtroFecha) || 
            reserva.fecha_fin.startsWith(filtroFecha);

        return nombreMatch && tipoMatch && fechaMatch;
    });

    const eliminarReserva = async (id) => {
        if (!window.confirm('¿Estás seguro de eliminar esta reserva?')) return;

        try {
            const response = await fetch(`http://localhost:3001/api/reservas/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setReservas(reservas.filter(reserva => reserva.id !== id));
            } else {
                const errorData = await response.json();
                alert(errorData.error || 'Error al eliminar reserva');
            }
        } catch (err) {
            console.error('Error al eliminar:', err);
        }
    };

    return (
        <div className="contenedor-reservas">
            <img src={banner} alt="Vista del hotel" className="imagen-banner2" />
            <h2 id='consultar-reserva'>Consultar tus Reservas</h2>
            <div id='contenedor-c-r'>
                {error && <p>{error}</p>}

                {/* Controles de filtro */}
                <div className="filtros-reservas" style={{ marginBottom: '20px', display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                    <input
                        type="text"
                        placeholder="Filtrar por nombre"
                        value={filtroNombre}
                        onChange={(e) => setFiltroNombre(e.target.value)}
                    />

                    <select value={filtroTipo} onChange={(e) => setFiltroTipo(e.target.value)}>
                        <option value="">Todos los tipos</option>
                        <option value="Estándar">Estándar</option>
                        <option value="Doble">Doble</option>
                        <option value="Suite">Suite</option>
                    </select>

                    <input
                        type="date"
                        value={filtroFecha}
                        onChange={(e) => setFiltroFecha(e.target.value)}
                    />
                </div>
            
                {reservasFiltradas.length === 0 ? (
                    <p>No hay reservas que coincidan con los filtros.</p>
                ) : (
                    <table className="tabla-reservas">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Tipo</th>
                                <th>Fecha Entrada</th>
                                <th>Fecha Salida</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reservasFiltradas.map(reserva => (
                                <tr key={reserva.id}>
                                    <td>{reserva.id}</td>
                                    <td>{reserva.nombre_cliente}</td>
                                    <td>{reserva.tipo_habitacion}</td>
                                    <td>{new Date(reserva.fecha_inicio).toLocaleDateString('es-ES', {
                                        day: 'numeric', month: 'long', year: 'numeric'
                                    })}</td>
                                    <td>{new Date(reserva.fecha_fin).toLocaleDateString('es-ES', {
                                        day: 'numeric', month: 'long', year: 'numeric'
                                    })}</td>
                                    <td>
                                        <button onClick={() => eliminarReserva(reserva.id)}>Eliminar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

export default ConsultarReserva;
