// importamos la biblioteca principal de React
import React from 'react';
// importamos el módulo de ReactDOM para manipular el DOM (interfaz gáfica de navegador)
import ReactDOM from 'react-dom/client';
// importamos nuestro componente rincipal "App" desde el archivo App.js
import App from './App';

//Creamos el nodo Raíz donde se renderizará nuestra aplicacion React
// Buscamos un elementos HTML con id "root" (viene del archivo/index.html)
const root = ReactDOM.createRoot(document.getElementById('root'));

//Renderizamos la aplicacón React dentro del DOM
//Usamos <React.StrictModel> para activar verificamos adicionales en derarrollo
//Dentro de ese contenedor , cargamos el componenete <App/> (que es nuestra aplicación)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
