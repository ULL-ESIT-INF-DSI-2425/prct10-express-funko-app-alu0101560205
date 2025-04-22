import { request } from "http";

// Define la URL de la API weatherStack con la clave de acceso y las coordenadas de ubicacion,
// pero esta url no funciona porque es con la key del profe 
const url =
  "http://api.weatherstack.com/current?access_key=6ba54277eb5f80ca8709cb6ba78beb64&query=28.48,-16.31&units=m";

// Invocar al método request para crear una petición HTTP, no hemos especificado parametros
// asi que toma valores por defecto, esto es, protocolo http, puerto 80 y método HTTP GET

const req = request(url, (response) => { // Realizar una solicitud GET a la url especificada. Response es un objeto IncomingMessage y objeto EventEmitter.
  let data = "";
  response.on("data", (chunk) => { // Escucha el evento data para recibir fragmentos de datos de la respuesta
    data += chunk; // Acumula los fragmentos de datos en la variable 'data'
  });

  response.on("end", () => { // Escucha el evento 'end' que indica que se ha recibido toda la respuesta
    const body = JSON.parse(data); // Convierte la cadena de datos JSON en un objeto JavaScript
    console.log(body); // Muestra el objeto JSON en la consola
  });
});

// El método request devuelve un objeto ClientRequest, que queda apuntado por req.

// Maneja cualquier error que ocurra durante la solicitud
req.on("error", (error) => {
  console.log(error.message); // Muestra el mensaje de error en la consola
});

req.end(); // Finaliza la solicitud