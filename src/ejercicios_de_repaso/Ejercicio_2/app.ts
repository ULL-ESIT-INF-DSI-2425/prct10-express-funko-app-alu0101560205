/*
Lleve a cabo los siguientes ejercicios en su repositorio:

Vaya al sitio web https://wizard-world-api.herokuapp.com/swagger/index.html el cual muestra un frontend para llevar a cabo peticiones HTTP sobre un API REST, en concreto, sobre una con información acerca del mundo de los libros de Harry Potter.
Analice las peticiones que se pueden hacer sobre la ruta /Spells.
Implemente una función findSpell:
La función debe recibir tres argumentos opcionales: un nombre de hechizo, un tipo de hechizo y la manera de invocar el hechizo (son los campos de la query string de la ruta /Spells).
La función debe devolver una promesa, que se resolverá siempre y cuando la petición HTTP realizada a la ruta /Spells haya devuelto, al menos, la información de un hechizo. La promesa se rechazará cuando surja cualquier tipo de error durante la petición HTTP o en el caso de que no se obtenga información para los hechizos.
Lleve a cabo pruebas unitarias de la función implementada haciendo uso de Vitest.
Como entrega de esta tarea deberá indicar el enlace al repositorio GitHub con los ejercicios de evaluación solicitados.
*/

import https from 'https';
import { URL } from 'url';

// Definimos el tipo de hechizo, basándonos en lo que devuelve la API
export type Spell = {
  id: string;
  name: string;
  incantation: string | null;
  effect: string | null;
  canBeVerbal: boolean;
  type: string | null;
  light: string | null;
  creator: string | null;
};

/**
 * Función para buscar hechizos en la API de Wizard World
 * @param name Nombre del hechizo (opcional)
 * @param type Tipo de hechizo (opcional)
 * @param incantation Encantamiento del hechizo (opcional)
 * @returns Una promesa que se resuelve con un array de hechizos o se rechaza con un error
 */
export const findSpell = (
  name?: string,
  type?: string,
  incantation?: string
): Promise<Spell[]> => {
  return new Promise<Spell[]>((resolve, reject) => {
    const baseUrl = 'https://wizard-world-api.herokuapp.com/Spells'; // URL base de la API
    const url = new URL(baseUrl); // Creamos un objeto URL para construir la query string fácilmente

    // Agregamos los parámetros opcionales a la URL si están definidos
    if (name) url.searchParams.append('name', name);
    if (type) url.searchParams.append('type', type);
    if (incantation) url.searchParams.append('incantation', incantation);

    // Realizamos la petición HTTPS GET a la URL construida
    https
      .get(url.toString(), (res) => {
        let data = '';

        // Escuchamos los datos que vienen en "chunks"
        res.on('data', (chunk) => {
          data += chunk; // Concatenamos todos los fragmentos de datos en una sola cadena
        });

        // Cuando la respuesta termina, procesamos el resultado
        res.on('end', () => {
          try {
            const spells: Spell[] = JSON.parse(data); // Parseamos el JSON
            // Si se encontró al menos un hechizo, resolvemos la promesa
            if (spells.length > 0) {
              resolve(spells);
            } else { // Si no se encontraron hechizos, rechazamos la promesa con un mensaje personalizado
              reject(new Error('No se encontraron hechizos.'));
            }
          } catch (error) { // Si hay un error al parsear el JSON, rechazamos la promesa
            reject(new Error('Error al parsear la respuesta del servidor.'));
          }
        });
      })
      .on('error', (err) => { // Si ocurre un error durante la petición HTTPS, rechazamos la promesa
        reject(new Error(`Error en la petición HTTP: ${err.message}`));
      });
  });
};