/**
 * Las promesas son un mecanismo que permite, al igual que los manejadores o callbacks, 
 * gestionar la ejecución de código asíncrono. 
 */

import { rejects } from "assert";

/**
 * Función para mostrar el ejemplo de uso de un callback
 * @param cb manejador o callback. Los parametros del callback son
 * una cadena de caracteres informando de un error, y una cadena que
 * representa una ejecución satisfactoria.
 */
const myCallbackFunction = (
  cb: (error: string | undefined, result: string | undefined) => void,
) => {
  setTimeout(() => { // Invocacion a settimeout a modo de ejemplo
    // Una vez transcurra un seg, llamaremos al callback de la funcion
    cb(undefined, "This is a succesful result");
  }, 1000);
};

// Controlamos si hubo error o exito, e imprimimos
myCallbackFunction((error, result) => {
  if (error) {
    console.log("Error:", error);
  } else {
    console.log("Success:", result);
  }
});

/**
 * Problemas:
 *    - Orden de los argumentos al invocar el callback
 *    - Gestion desde un único callback de errores o de ejecucion satisfactoria
 * Se evitan usando promesas
 */


/*
 * Usamos el constructor Promise pasandole string como argumento de tipo.
 * El constructor recibe por parametro una funcion. Los argumentos de esa funcion son
 * dos callbacks denominados resolve y reject. 
*/
const myPromise = new Promise<string>((resolve, reject) => {
  setTimeout(() => {
    // Si la ejecucion es satisfactoria, invocamos a resolve, pero si tiene error lo hacemos con reject (cumplir promesa o romper promesa)
    // resolve("This is a successful response"); // El tipo de argumento pasado al resolve debe ser del mismo tipo que la promesa (string)
    reject("This is an error"); // El tipo de argumento que se le pasa a reject no hace falta que coincida con el de la promesa
  }, 1000);
});

// Al invocar a la promesa debemos hacer uso de los metodos then y catch
myPromise
  .then((result) => { // Then es para cuando la promesa se cumple
    console.log("Success:", result);
  })
  .catch((error) => { // Catch es para cuando la promesa se rompe
    console.log("Error:", error); 
  });

// Ahora, ya no dependemos del orden, si algo va bien invocamos a resolve, y sino, a reject
// Además, con then y catch atendemos a las promesas cumplidas o rotas

// Sin embargo, si dentro del manejador setTimeOut invocamos primero a resolve y seguidamente
// a reject, solo muestra el mensaje de resolve, debido a que una promesa cumplida no puede volver
// a cumplirse o romperse.