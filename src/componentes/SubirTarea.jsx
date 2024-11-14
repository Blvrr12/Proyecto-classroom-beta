import React, { useState } from 'react';
import { storage } from '../firebase';  // Importar el servicio de storage
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import '../firebase'; // Ajusta la ruta según la extensión del archivo

const SubirArchivo = () => {
  const [archivo, setArchivo] = useState(null);

  const manejarSubida = (e) => {
    e.preventDefault();
    if (!archivo) return;

    const storageRef = ref(storage, `archivos/${archivo.name}`);
    const uploadTask = uploadBytesResumable(storageRef, archivo);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Puedes monitorear el progreso aquí si lo deseas
        const progreso = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Subida en progreso: ${progreso}%`);
      },
      (error) => {
        console.error("Error al subir archivo: ", error);
      },
      () => {
        // Obtener la URL de descarga cuando la subida haya terminado
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log("Archivo disponible en: ", url);
        });
      }
    );
  };

  return (
    <form onSubmit={manejarSubida}>
      <input type="file" onChange={(e) => setArchivo(e.target.files[0])} />
      <button type="submit">Subir Archivo</button>
    </form>
  );
};

export default SubirArchivo;
