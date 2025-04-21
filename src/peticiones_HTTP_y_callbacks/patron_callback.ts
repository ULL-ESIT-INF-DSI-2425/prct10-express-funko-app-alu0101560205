import request from "request";

// Define la función 'weatherInfo' que obtiene información meteorológica para una ubicación específica
const weatherInfo = (
  location: string, // La ubicación para la cual se desea obtener información meteorológica
  callback: (
    err: string | undefined, // El error, si ocurre alguno
    data: request.Response | undefined, // Los datos de la respuesta, si la solicitud es exitosa
  ) => void,
) => {
  // Construye la URL de la API de Weatherstack con la clave de acceso y la ubicación proporcionada
  const url = `http://api.weatherstack.com/current?access_key=6ba54277eb5f80ca8709cb6ba78beb64&query=${encodeURIComponent(location)}&units=m`;

  request({ url: url, json: true }, (error: Error, response) => {
    if (error) { // Verifica si ocurrió un error durante la solicitud
      callback(
        `Weatherstack API is not available: ${error.message}`, // Llama al callback con el mensaje de error
        undefined, // No hay datos disponibles
      );
    } else if (response.body.error) {
      callback(
        `Weatherstack API error: ${response.body.error.type}`, // Llama al callback con el tipo de error de la API
        undefined, // No hay datos disponibles
      );
    } else {
      callback(undefined, response); // Llama al callback con los datos de la respuesta
    }
  });
};

// Llama a la función 'weatherInfo' con la ubicación proporcionada como argumento en la línea de comandos
weatherInfo(process.argv[2], (err, data) => {
  if (err) {
    console.log(err); // Muestra el error en la consola si ocurre alguno
  } else if (data) {
    console.log(data.body); // Muestra el cuerpo de la respuesta en la consola si la solicitud es exitosa
  }
});