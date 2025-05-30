import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Inicio from './pages/Inicio';
import Reservar from './pages/Reservar';
import Consultar from './pages/Consultar';
import Contacto from './pages/Contacto';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/reservar" element={<Reservar />} />
        <Route path="/consultar" element={<Consultar />} />
        <Route path="/contacto" element={<Contacto />} />
      </Routes>
    </Router>
  );
}

export default App;