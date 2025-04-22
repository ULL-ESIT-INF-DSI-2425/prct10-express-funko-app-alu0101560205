import request from "request";

// Obtiene la ubicación de los argumentos de la línea de comandos
const location = process.argv[2];

// Define la URL de la API de Weatherstack con la clave de acceso y la ubicación proporcionada
const url = `http://api.weatherstack.com/current?access_key=6ba54277eb5f80ca8709cb6ba78beb64&query=${location}&units=m`;

// Realiza una solicitud HTTP GET a la URL especificada
request({ url: url, json: true }, (error: Error, response) => {
  if (error) { // Verifica si ocurrió un error durante la solicitud
    console.log(`Weatherstack API is not available: ${error.message}`);
  } else if (response.body.error) { // Muestra el mensaje de error en la consola
    console.log(`Weatherstack API error: ${response.body.error.type}`);
  } else {
    console.log(response.body); // Muestra el cuerpo de la respuesta en la consola
  }
});