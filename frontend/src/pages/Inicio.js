import React from 'react';
import banner from '../img/banner.jpg'
import estandarImg from '../img/estandar.jpg';
import dobleImg from '../img/doble.jpg';
import suiteImg from '../img/suite.jpg';
import ConsultaDisponibilidad from '../components/ConsultaDisponibilidad';


function Inicio() {
    return (
        <div id='division0'>
            <div className='banner'>
                <img src={banner} alt="Vista del hotel" className="imagen-banner" />
                <h1>Somos tu refugio de tranquilidad y confort</h1>
                <div className="barra-banner">
                    <a  href="#tipos-habitacion" className="btn-banner">Tipos de habitación</a>
                    <a  href="#formulario-disponibilidad" className="btn-banner">Ver disponibilidad</a>
                </div>
            </div>
            <div className="contenedor-principal">
                <div id="tipos-habitacion">
                    <h2>Tipos de Habitación</h2>
                    <div className="habitaciones">
                        <div className="habitacion">
                            <img src={estandarImg} alt="Habitación Estándar" className="imagen-habitacion" />
                            <h3>Habitación Estándar</h3>
                            <p>Confortable y funcional, perfecta para viajes de negocios o estancias cortas.</p>
                        </div>
                        <div className="habitacion">
                            <img src={dobleImg} alt="Habitación Doble" className="imagen-habitacion" />
                            <h3>Habitación Doble</h3>
                            <p>Ideal para parejas o amigos, con más espacio y comodidades adicionales.</p>
                        </div>
                        <div className="habitacion">
                            <img src={suiteImg} alt="Suite" className="imagen-habitacion" />
                            <h3>Suite</h3>
                            <p>La máxima expresión de lujo y comodidad, con sala de estar y vistas privilegiadas.</p>
                        </div>
                    </div>
                </div>
                <ConsultaDisponibilidad />
            </div>
        </div>
    );
}

export default Inicio;
