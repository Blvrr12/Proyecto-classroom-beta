// Importar las funciones necesarias del SDK
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";  // Firestore (base de datos)
import { getAuth } from "firebase/auth";  // Autenticación
import { getStorage } from "firebase/storage";  // Almacenamiento para subir archivos
import './firebase.js'; // Ajusta la ruta según la extensión del archivo


// Configuración de Firebase (usa el código que te dio Firebase Console)
const firebaseConfig = {
  apiKey: "AIzaSyAIbmExbHHTB7fEh20tebtuoMzcviXwS-s",
  authDomain: "pe-isc.firebaseapp.com",
  projectId: "pe-isc",
  storageBucket: "pe-isc.appspot.com",
  messagingSenderId: "659939020866",
  appId: "1:659939020866:web:b162f13bc41a6a3258dddb",
  measurementId: "G-TX21K4HF23"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar servicios
const db = getFirestore(app);  // Firestore (base de datos)
const auth = getAuth(app);  // Autenticación
const storage = getStorage(app);  // Storage para subir archivos

// Exportar para usar en otros archivos
export { db, auth, storage };
