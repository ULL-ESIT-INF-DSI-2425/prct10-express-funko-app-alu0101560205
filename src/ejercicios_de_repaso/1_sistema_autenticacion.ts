/**
 * Crear un sistema que simule el inicio de sesion donde se verifican los datos
 * de un usuario, mediante promesas
 */

const login = (username: string, password: string) => {
  return new Promise<string>((resolve, reject) => {
    setTimeout(() => {
      if (username === "estela" && password === "1234") {
        resolve("Login successful");
      } else {
        reject("Invalid username or password");
      }
    }, 1000);
  });
};

const getUserData = (username: string) => {
  return new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve(`User data for ${username}: Name: Estela, Age: 20`);
    }, 1000);
  });
};

// Invoamos a login y encadenamos la recuperacion de los datos
login("estela", "1234")
  .then((succesMessage) => {
    console.log(succesMessage);
    return getUserData("estela");
  })
  .then((userData) => {
    console.log("resultado de la segunda llamada, es decir, el retorno:");
    console.log(userData);
  })
  .catch((error) => {
    console.log(error);
  });