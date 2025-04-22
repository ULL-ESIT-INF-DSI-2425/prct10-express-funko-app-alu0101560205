import request from "request";

// Define la función 'coordinatesInfo' que obtiene las coordenadas de una ubicación específica
export const coordinatesInfo = (
  location: string, // La ubicación para la cual se desea obtener las coordenadas
  callback: (
    err: string | undefined, // El error, si ocurre alguno
    data: request.Response | undefined, // Los datos de la respuesta, si la solicitud es exitosa
  ) => void,
) => {
  // Construye la URL de la API de Mapbox con la clave de acceso y la ubicación proporcionada
  const url = `http://api.mapbox.com/search/geocode/v6/forward?q=${encodeURIComponent(location)}&access_token=pk.eyJ1IjoiZWR1c2VncmUiLCJhIjoiY204eThlOTRxMDlxODJzcXc2OHR5Y2RzdSJ9.iF3kDlao4wOnGYPtOyUswg&limit=1`;

  // Realiza una solicitud HTTP GET a la URL especificada
  request({ url: url, json: true }, (error: Error, response) => {
    if (error) {
      callback(`Mapbox API is not available: ${error.message}`, undefined); // Llama al callback con el mensaje de error
    } else if (response.body.features.length === 0) {
      callback(`Mapbox API error: no location found`, undefined); // Llama al callback si no se encuentra la ubicación
    } else {
      callback(undefined, response); // Llama al callback con los datos de la respuesta
    }
  });
};


// Define la función 'weatherInfo' que obtiene información meteorológica para una ubicación específica
export const weatherInfo = (
  location: string, // La ubicación para la cual se desea obtener información meteorológica
  callback: (
    err: string | undefined, // El error, si ocurre alguno
    data: request.Response | undefined, // Los datos de la respuesta, si la solicitud es exitosa
  ) => void,
) => {
  // Construye la URL de la API de Weatherstack con la clave de acceso y la ubicación proporcionada
  const url = `http://api.weatherstack.com/current?access_key=6ba54277eb5f80ca8709cb6ba78beb64&query=${encodeURIComponent(location)}&units=m`;

  // Realiza una solicitud HTTP GET a la URL especificada
  request({ url: url, json: true }, (error: Error, response) => {
    if (error) {
      callback(
        `Weatherstack API is not available: ${error.message}`, // Llama al callback con el mensaje de error
        undefined,
      );
    } else if (response.body.error) {
      callback(
        `Weatherstack API error: ${response.body.error.type}`, // Llama al callback con el tipo de error de la API
        undefined,
      );
    } else {
      callback(undefined, response); // Llama al callback con los datos de la respuesta
    }
  });
};


// Llama a la función 'coordinatesInfo' con la ubicación proporcionada como argumento en la línea de comandos
coordinatesInfo(process.argv[2], (coordErr, coordData) => {
  if (coordErr) {
    console.log(coordErr); // Muestra el error en la consola si ocurre alguno
  } else if (coordData) {
    const longitude: number = coordData.body.features[0].geometry.coordinates[0]; // Obtiene las coordenadas de la respuesta de Mapbox
    const latitude: number = coordData.body.features[0].geometry.coordinates[1];
    // Llama a la función 'weatherInfo' con las coordenadas obtenidas
    weatherInfo(`${latitude},${longitude}`, (weatherErr, weatherData) => {
      if (weatherErr) {
        console.log(weatherErr);
      } else if (weatherData) {
        // Muestra la información meteorológica en la consola si la solicitud es exitosa
        console.log(
          `Currently, the temperature is ` +
            `${weatherData.body.current.temperature} degrees in ` +
            `${weatherData.body.location.name}`,
        );
      }
    });
  }
});