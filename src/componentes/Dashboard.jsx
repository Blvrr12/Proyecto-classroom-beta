import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase';  
import { onAuthStateChanged } from 'firebase/auth';  
import { doc, getDoc } from 'firebase/firestore';  
const Dashboard = () => {
  const [usuario, setUsuario] = useState(null);
  const [rol, setRol] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db, "usuarios", user.uid));
        setUsuario(user);
        setRol(userDoc.data().rol);  // Obtener el rol del usuario
      } else {
        // Redirigir a login si no hay usuario autenticado
        // navigate('/login');  // Descomentar si tienes el hook de navigate
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      {rol === 'profesor' && (
        <div>
          <h3>Hola, Profesor {usuario?.displayName}</h3>
          {/*  para asignar tareas */}
        </div>
      )}
      {rol === 'alumno' && (
        <div>
          <h3>Hola, Alumno {usuario?.displayName}</h3>
          {/*   para subir tareas */}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
