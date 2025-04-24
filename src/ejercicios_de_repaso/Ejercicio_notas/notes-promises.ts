import fs from "fs/promises";
import { Note, ResponseType } from "./types.js";
import path, { resolve } from 'path';

export const readNote = (title: string, fichero : string): Promise<ResponseType> => {
  let dir = path.join("/home/usuario/PRACTICAS-DSI/prct10-express-funko-app-InesCabreraBetancor/public/notes",fichero);
  //console.log(dir);
  return loadNotes(dir).then((data) => {
    const notes: Note[] = JSON.parse(data);
    const foundNote = notes.find((note) => note.title === title);
    const response: ResponseType = {
      type: "read",
      success: !!foundNote,
      notes: foundNote ? [foundNote] : undefined,
    };
    return response;
  }).catch((err) => {
      const error = new Promise<ResponseType>((_, reject)=> {
        reject(new Error(`Error reading note: ${(err as Error).message}`));
      })
      return error;
      //return Promise.reject(new Error(`Error reading note: ${(err as Error).message}`));
    });
};

export const loadNotes = (direccion : string): Promise<string> => {
  return fs.readFile(direccion, "utf-8").then((data) => data)
  .catch((err) => {
    const error = new Promise<string>((_, reject)=> {
      reject(new Error(`Error reading notes file: ${(err as Error).message}`))
    })
    return error;
    //new Promise (reject, resolve) 
    //return Promise.reject(new Error(`Error reading notes file: ${(err as Error).message}`));
  });
};