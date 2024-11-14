import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  
import './App.css';
import Login from './componentes/login';
import Registro from './componentes/Registro';
import Dashboard from './componentes/Dashboard';
import AsignarTarea from './componentes/AsignarTarea';
import SubirTarea from './componentes/SubirTarea';
import { Navigate } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} /> {/* Redirige la raíz al login */}
          <Route path="/login" element={<Login />} />           {/* Ruta para Login */}
          <Route path="/registro" element={<Registro />} />     {/* Ruta para Registro */}
          <Route path="/dashboard" element={<Dashboard />} />   {/* Ruta para Dashboard */}
          <Route path="/asignar-tarea" element={<AsignarTarea />} /> {/* Ruta para Asignar Tarea */}
          <Route path="/subir-tarea" element={<SubirTarea />} />   {/* Ruta para Subir Tarea */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
