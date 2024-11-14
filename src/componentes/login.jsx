import React, { useState } from 'react'; 
import './estilosSesion.css';
import { auth } from '../firebase';  // Asegúrate de importar el archivo correcto de Firebase
import { signInWithEmailAndPassword } from 'firebase/auth';  // Importa la función para el login
import { useNavigate } from 'react-router-dom';  // Para redirigir al usuario después del login

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const manejarLogin = async (e) => {
    e.preventDefault();  
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Usuario autenticado:", userCredential.user);
      navigate('/dashboard');  // Redirigir al dashboard al iniciar sesión 
    } catch (error) {
      setError("Error al iniciar sesión: " + error.message);
    }
  };

  const manejarRegistro = () => {
    navigate('/registro');  // Redirigir a la página de registro
  };

  return (
    <div className="login-page">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={manejarLogin}>
        <input
          type="email"
          placeholder="Correo Electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)} 
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}  
        />
        <button type="submit">Entrar</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}  {/* Mostrar errores */}
      <button onClick={manejarRegistro}>Registrar</button>  {/* Botón de registro */}
    </div>
  );
}

export default Login;