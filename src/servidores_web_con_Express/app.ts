// Primer servidor en express

import express from 'express'; // Importamos módulo express

const app = express(); // Creamos un servidor mediante la invocacion de la función express

// Invocamos al método get, con dos argumentos:
//   - Primer arg (objeto Request): ruta en la que se llevarán a cabo peticiones desde un cliente (en nuestro caso la raiz de la url) 
//   - Segundo arg (objeto Response): manejador, que se ejecuta cada vez que se lleve a cabo una peticion a través de la ruta
app.get('', (_, res) => { // Primer arg del manejador es asi porque daremos contenido fijo independiente del tipo de peticion
  res.send('Hello World!\n'); // Envía una respuesta con el texto 'Hello World!' cuando se accede a la raíz
});

// Inicia el servidor y escucha en el puerto 3000
app.listen(3000, () => {
  console.log('Server is up on port 3000');
});

// NOTA: No deja ejecutarlo en chrome asi que lo hago desde terminal para ver resultado
// Comando: curl http://localhost:3000