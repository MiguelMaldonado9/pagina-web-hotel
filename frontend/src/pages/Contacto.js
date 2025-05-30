import React from 'react';
import '../components/styles/Styles.css'; // Usa tu archivo CSS

function Contacto() {
    return (
        <div className="contacto-contenedor">
        <div className="contacto-info">
            <h2>Información de Contacto</h2>
            <p><strong>Dirección:</strong> Calle 123 #45-67, Mosquera, Cundinamarca, Colombia</p>
            <p><strong>Email:</strong> mosqueraqueramiguelange@gmail.com</p>
            <p><strong>Teléfono fijo:</strong> +57 1 234 5678</p>
            <p><strong>Celular:</strong> +57 310 123 4567</p>

            <div className="redes-sociales">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="icono-red">
                <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="icono-red">
                <i className="fab fa-instagram"></i>
            </a>
            <a href="https://wa.me/573101234567" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="icono-red">
                <i className="fab fa-whatsapp"></i>
            </a>
            <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="icono-red">
                <i className="fab fa-youtube"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="X (antes Twitter)" className="icono-red">
                <i className="fab fa-twitter"></i>
            </a>
            </div>
        </div>

        <div className="contacto-formulario">
            <h2>Envíanos un mensaje</h2>
            <form>
            <label htmlFor="nombre">Nombre:</label>
            <input type="text" id="nombre" name="nombre" required />

            <label htmlFor="email">Correo electrónico:</label>
            <input type="email" id="email" name="email" required />

            <label htmlFor="asunto">Asunto:</label>
            <input type="text" id="asunto" name="asunto" required />

            <label htmlFor="mensaje">Mensaje:</label>
            <textarea id="mensaje" name="mensaje" rows="5" required></textarea>

            <button type="submit">Enviar</button>
            </form>
        </div>
        </div>
    );
}

export default Contacto;
