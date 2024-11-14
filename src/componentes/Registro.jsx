import React, { useState } from 'react';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import './estilosSesion.css'; 
const Registro = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nombre, setNombre] = useState('');
  const [rol, setRol] = useState('alumno');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const manejarRegistro = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "usuarios", user.uid), {
        nombre: nombre,
        email: email,
        rol: rol,
        creadoEn: new Date()
      });

      console.log("Usuario registrado y guardado en Firestore:", user.uid);
      navigate('/dashboard');

    } catch (error) {
      setError("Error al registrar: " + error.message);
    }
  };

  const manejarRegistroConGoogle = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      await setDoc(doc(db, "usuarios", user.uid), {
        nombre: user.displayName,
        email: user.email,
        rol: rol,
        creadoEn: new Date()
      });

      console.log("Usuario registrado con Google y guardado en Firestore:", user.uid);
      navigate('/dashboard');

    } catch (error) {
      setError("Error al registrarse con Google: " + error.message);
    }
  };

  return (
    <div className="registro-container"> {}
      <h2>Registro</h2>
      <form onSubmit={manejarRegistro}>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <select value={rol} onChange={(e) => setRol(e.target.value)}>
          <option value="alumno">Alumno</option>
          <option value="profesor">Profesor</option>
        </select>
        <button type="submit">Registrarse</button>
      </form>
      <button onClick={manejarRegistroConGoogle}>Registrarse con Google</button> {/* Botón para registrarse con Google */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Registro;
