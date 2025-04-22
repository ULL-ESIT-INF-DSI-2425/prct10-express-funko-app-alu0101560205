import request from "request";


// Define la URL de la API de Weatherstack con la clave de acceso y las coordenadas de ubicación
const url =
  "http://api.weatherstack.com/current?access_key=6ba54277eb5f80ca8709cb6ba78beb64&query=28.48,-16.31&units=m";

  
// Realiza una solicitud HTTP GET a la URL especificada
request({ url: url, json: true }, (error: Error, response) => {
  if (error) { // Verifica si ocurrió un error durante la solicitud
    console.log(error); // Muestra el error en la consola
  } else {
    console.log(response.body); // Muestra el cuerpo de la respuesta en la consola
  }
});