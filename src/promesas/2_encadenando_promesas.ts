/**
 * 
 * @param firstString Primer cadena de caracteres
 * @param secondString Segunda cadena de caracteres
 * @returns Una promesa
 */
const concatenate = (firstString: string, secondString: string) => {
  return new Promise<string>((resolve, reject) => {
    setTimeout(() => { // Lo ponemos dentro de settimeout para emular un comportamiento asincrono
      if (firstString.length === 0 || secondString.length === 0) { // Si alguna cadena esta vacia, invocamos a reject
        reject("Any of both arguments can be an empty string"); 
      } else { // Si no hay cadenas vacias, invocamos a resolve
        resolve(firstString + secondString);
      }
    }, 1000);
  });
};

// Invocamos a concatenate
concatenate("Hello ", "World!")
  .then((myString) => { // Promesa cumplida
    console.log(myString);
  })
  .catch((error) => { // Promesa rota
    console.log(error);
  });

// Ahora veamos la invocación a concatenate para poder concatenar 3 cadenas
concatenate("Hello ", "World!")
  .then((myString) => { // Promesa cumplida
    concatenate(myString, " I am Estelita") // Volvemos a llamar a concatenate
      .then((mySecondString) => { // promesa cumplida de la segunda invocacion
        console.log(mySecondString);
      })
      .catch((error) => { // promesa rota de la segunda invocacion
        console.log(error);
      });
  })
  .catch((error) => { // Promesa rota
    console.log(error);
  });

// Sin embargo, si quisiéramos encadenar más cadenas, se volvería difícil de leer
// Para evitar eso, usamos PROMESAS ENCADENADAS ------------------------------------------------------
concatenate("I'm studying", " informatics")
  .then((myString) => { // Como se invoco con dos cadenas no vacias, entrará aqui
    return concatenate(myString, " I am Estelita"); // Volvemos a llamar a la promesa
  })
  .then((myString2) => {
    console.log(myString2);
  })
  .catch((error) => { // Solo hace falta un catch, que manejará todos los errores
    console.log(error);
  });

// Veamos como concatenar 3 promesas:
concatenate("Hoolaa ", "a todos ")
  .then((myString) => {
    return concatenate(myString, "soy Estelita jijiji. ");
  })
  .then((myString2) => {
    return concatenate(myString2, "Esto es DSI y estoy estudiando zzzz.");
  })
  .then((myString3) => {
    console.log(myString3);
  })
  .catch((error) => {
    console.log(error);
  });

// Si hacemos que se rompa la tercera promesa, se mostrará el error al cabo de 3 segundos:
concatenate("Holisss ", "que chachi ")
  .then((myString) => {
    return concatenate(myString, "Esto es un aprueba para romper una pinky promise. ");
  })
  .then((myString2) => {
    return concatenate(myString2, "");
  })
  .then((myString3) => {
    console.log(myString3);
  })
  .catch((error) => {
    console.log(error);
  });