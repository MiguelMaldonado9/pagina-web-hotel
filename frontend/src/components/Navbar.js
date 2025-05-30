import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles/Styles.css';

function Navbar() {
    const [menuAbierto, setMenuAbierto] = useState(false);

    const toggleMenu = () => {
        setMenuAbierto(!menuAbierto);
    };

    return (
        <nav className='navbar'>
            <div className="navbar-brand">
                <i className="fas fa-hotel"></i> Hotel La Cascada
            </div>

            <div className="menu-toggle" onClick={toggleMenu}>
                <i className="fas fa-bars"></i>
            </div>

            <div className={`navbar-links ${menuAbierto ? 'activo' : ''}`}>
                <Link to="/" onClick={() => setMenuAbierto(false)}>
                    <i className="fas fa-home"></i> Inicio
                </Link>
                <Link to="/reservar" onClick={() => setMenuAbierto(false)}>
                    <i className="fas fa-calendar-check"></i> Reservar
                </Link>
                <Link to="/consultar" onClick={() => setMenuAbierto(false)}>
                    <i className="fas fa-search"></i> Consultar Reserva
                </Link>
                <Link to="/contacto" onClick={() => setMenuAbierto(false)}>
                    <i className="fas fa-envelope"></i> Contacto
                </Link>
            </div>
        </nav>
    );
}

export default Navbar;
