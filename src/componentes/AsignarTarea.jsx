import React, { useState } from 'react';
import { db } from '../firebase';  // Importar la base de datos de firebase.js
import { collection, addDoc } from 'firebase/firestore';  // Función para agregar documentos

const AsignarTarea = () => {
  const [titulo, setTitulo] = useState('');
  const [fechaEntrega, setFechaEntrega] = useState('');

  const manejarAsignar = async (e) => {
    e.preventDefault();
    try {
      // Guardar la tarea en Firestore
      const docRef = await addDoc(collection(db, "tareas"), {
        titulo: titulo,
        fechaEntrega: fechaEntrega,
        creadaEn: new Date()
      });
      console.log("Tarea asignada con ID: ", docRef.id);
    } catch (error) {
      console.error("Error al asignar la tarea: ", error);
    }
  };

  return (
    <form onSubmit={manejarAsignar}>
      <input
        type="text"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        placeholder="Título de la tarea"
      />
      <input
        type="date"
        value={fechaEntrega}
        onChange={(e) => setFechaEntrega(e.target.value)}
      />
      <button type="submit">Asignar Tarea</button>
    </form>
  );
};

export default AsignarTarea;
