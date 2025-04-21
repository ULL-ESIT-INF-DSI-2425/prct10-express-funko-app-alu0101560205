import express from 'express';

// Crea una instancia de la aplicación Express
const app = express();

// Define una ruta GET para la raíz ('/') de la aplicación
app.get('', (_, res) => {
  res.send('<h1>My application</h1>'); // Envía una respuesta con un encabezado HTML cuando se accede a la raíz
});

app.get('/notes', (_, res) => {
  res.send({ // Envía una respuesta con un objeto JSON que contiene una lista de notas cuando se accede a '/notes'
    notes: [
      {
        title: 'Blue note',
        body: 'This is a blue note',
        color: 'blue',
      },
      {
        title: 'Yellow note',
        body: 'This is a yellow note',
        color: 'yellow',
      },
    ],
  });
});

// Define una ruta GET para '/info' de la aplicación
app.get('/info', (_, res) => {
  res.send('Information'); // Envía una respuesta con el texto 'Information' cuando se accede a '/info'
});

// Inicia el servidor y escucha en el puerto 3000
app.listen(3000, () => {
  console.log('Server is up on port 3000');
});