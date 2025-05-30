import React, { useState, useRef, } from 'react';
import axios from 'axios';
import estandarImg from '../img/estandar.jpg';
import dobleImg from '../img/doble.jpg';
import suiteImg from '../img/suite.jpg';

function Reservar() {
    const [formData, setFormData] = useState({
        tipo: '',
        nombre: '',
        fecha_inicio: '',
        fecha_fin: ''
    });

    // Referencias a las tarjetas de habitación
    const estandarRef = useRef(null);
    const dobleRef = useRef(null);
    const suiteRef = useRef(null);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));

        // Si se está cambiando el tipo, hacer scroll automático
        if (name === 'tipo') {
            setTimeout(() => {
                if (value === 'Estándar' && estandarRef.current) {
                    estandarRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
                } else if (value === 'Doble' && dobleRef.current) {
                    dobleRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
                } else if (value === 'Suite' && suiteRef.current) {
                    suiteRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }, 100);
        }
    };

    const seleccionarTipo = (tipoSeleccionado) => {
        setFormData((prevData) => ({
            ...prevData,
            tipo: tipoSeleccionado
        }));
        // Hacer scroll a la tarjeta seleccionada
        setTimeout(() => {
            if (tipoSeleccionado === 'Estándar' && estandarRef.current) {
                estandarRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } else if (tipoSeleccionado === 'Doble' && dobleRef.current) {
                dobleRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } else if (tipoSeleccionado === 'Suite' && suiteRef.current) {
                suiteRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, 100);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { tipo, nombre, fecha_inicio, fecha_fin } = formData;

        // Validación: fecha_fin no puede ser anterior a fecha_inicio
        if (new Date(fecha_fin) < new Date(fecha_inicio)) {
        alert("La fecha de fin no puede ser anterior a la fecha de inicio.");
        return;
    }

        try {
            const response = await fetch('http://localhost:3001/reservas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (!response.ok) {
                // Mostrar el error recibido del backend
                alert(data.error || 'Error al realizar la reserva');
            } else {
                alert('Reserva realizada con éxito');
                //limpiar el formulario 
                setFormData({
                    tipo: '',
                    nombre: '',
                    fecha_inicio: '',
                    fecha_fin: ''
                });
            }

        } catch (error) {
            console.error('Error en la solicitud:', error);
            alert('Hubo un error en la conexión con el servidor');
        }
    };


    return (
        <div className="contenedor-principal">
            <div className="tipos-habitacion">
                <h2>Tipos de Habitación</h2>
                <div className="habitaciones">
                    <div
                        ref={estandarRef}
                        className={`habitacion ${formData.tipo === 'Estándar' ? 'activa' : formData.tipo ? 'opaca' : ''}`}
                        onClick={() => seleccionarTipo('Estándar')}
                    >
                        <img src={estandarImg} alt="Habitación Estándar" className="imagen-habitacion" />
                        <h3>Habitación Estándar</h3>
                        <p>Confortable y funcional, perfecta para viajes de negocios o estancias cortas.</p>
                    </div>
                    <div
                        ref={dobleRef}
                        className={`habitacion ${formData.tipo === 'Doble' ? 'activa' : formData.tipo ? 'opaca' : ''}`}
                        onClick={() => seleccionarTipo('Doble')}
                    >
                        <img src={dobleImg} alt="Habitación Doble" className="imagen-habitacion" />
                        <h3>Habitación Doble</h3>
                        <p>Ideal para parejas o amigos, con más espacio y comodidades adicionales.</p>
                    </div>
                    <div
                        ref={suiteRef}
                        className={`habitacion ${formData.tipo === 'Suite' ? 'activa' : formData.tipo ? 'opaca' : ''}`}
                        onClick={() => seleccionarTipo('Suite')}
                    >
                        <img src={suiteImg} alt="Suite" className="imagen-habitacion" />
                        <h3>Suite</h3>
                        <p>La máxima expresión de lujo y comodidad, con sala de estar y vistas privilegiadas.</p>
                    </div>
                </div>
            </div>

            <div className="formulario-reserva">
                <h2>Reservar Habitación</h2>
                <form onSubmit={handleSubmit}>
                    <label>Tipo de Habitación:</label>
                    <select name="tipo" onChange={handleChange} value={formData.tipo} required>
                        <option value="">Seleccione</option>
                        <option value="Estándar">Estándar</option>
                        <option value="Doble">Doble</option>
                        <option value="Suite">Suite</option>
                    </select>

                    <label>Nombre del Cliente:</label>
                    <input type="text" name="nombre" onChange={handleChange} value={formData.nombre} required />

                    <label>Fecha de Inicio:</label>
                    <input type="date" name="fecha_inicio" onChange={handleChange} value={formData.fecha_inicio} required />

                    <label>Fecha de Fin:</label>
                    <input type="date" name="fecha_fin" onChange={handleChange} value={formData.fecha_fin} required />

                    <button type="submit">Reservar</button>
                </form>
            </div>
        </div>
    );
}


export default Reservar;

