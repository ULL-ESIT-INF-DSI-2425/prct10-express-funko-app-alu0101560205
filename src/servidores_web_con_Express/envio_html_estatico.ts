// import express from 'express';
// import { join, dirname } from 'path';
// import { fileURLToPath } from 'url';

// const app = express();

// // Obtiene el directorio actual del archivo y establece la ruta al directorio 'public'
// const __dirname = join(dirname(fileURLToPath(import.meta.url)), 'public');
// // Configura la aplicación para servir archivos estáticos desde el directorio 'public'
// app.use(express.static(__dirname));

// // Elimina la ruta por defecto ya que el archivo 'index.html' en 'public' se servirá automáticamente
// app.get('', (_, res) => {
//   res.send('<h1>My application</h1>');
// });

// app.get('/notes', (_, res) => {
//   res.send({
//     notes: [
//       {
//         title: 'Blue note', // Título de la primera nota
//         body: 'This is a blue note', // Cuerpo de la primera nota
//         color: 'blue', // Color de la primera nota
//       },
//       {
//         title: 'Yellow note', // Título de la segunda nota
//         body: 'This is a yellow note', // Cuerpo de la segunda nota
//         color: 'yellow', // Color de la segunda nota
//       },
//     ],
//   });
// });

// app.get('/info', (_, res) => {
//   res.send('Information');
// });

// app.listen(3000, () => {
//   console.log('Server is up on port 3000');
// });


import express from 'express';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const app = express();

const __dirname = join(dirname(fileURLToPath(import.meta.url)), '../public');
app.use(express.static(__dirname));

app.get('/notes', (_, res) => {
  res.send({
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

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});