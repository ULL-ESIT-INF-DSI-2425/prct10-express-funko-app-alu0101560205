import express from 'express';

const app = express(); // Crea una instancia de la aplicación Express

// Define una ruta GET para la raíz ('/') de la aplicación
app.get('', (_, res) => {
  res.send('<h1>My application</h1>'); // Envía una respuesta con un encabezado HTML cuando se accede a la raíz
});

// Define una ruta GET para '/notes' de la aplicación
app.get('/notes', (_, res) => {
  res.send('Notes'); // Envía una respuesta con el texto 'Notes' cuando se accede a '/notes'
});

// Define una ruta GET para '/info' de la aplicación
app.get('/info', (_, res) => {
  res.send('Information'); // Envía una respuesta con el texto 'Information' cuando se accede a '/info'
});

// Inicia el servidor y escucha en el puerto 3000
app.listen(3000, () => {
  console.log('Server is up on port 3000'); // Muestra un mensaje en la consola indicando que el servidor está en funcionamiento
});