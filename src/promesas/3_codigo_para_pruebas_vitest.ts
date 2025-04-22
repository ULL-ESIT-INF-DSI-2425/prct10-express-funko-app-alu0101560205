import request from "request";

export const coordinatesInfoPromises = (location: string) => {
  const url = `http://api.mapbox.com/search/geocode/v6/forward?q=${encodeURIComponent(location)}&access_token=pk.eyJ1IjoiZWR1c2VncmUiLCJhIjoiY205MDY2aDZoMGo1ZDJocjA1ZTY2dHYyeCJ9.dJrmYDMmeVPotPhQPxeGBA&limit=1`;
  return new Promise<request.Response>((resolve, reject) => {
    request(
      { url: url, json: true },
      (error: Error, response: request.Response) => {
        if (error) {
          reject(error.message);
        } else if (response.body.features.length === 0) {
          reject("Mapbox API error: no location found");
        } else {
          resolve(response);
        }
      },
    );
  });
};