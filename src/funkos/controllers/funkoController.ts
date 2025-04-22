import { Funko } from '../models/funko.js';
import fs from 'fs-extra';
import path from 'path';

const basePath = './data';

export const saveFunko = (user: string, funko: Funko): Promise<void> => {
  const userDir = path.join(basePath, user);
  const filePath = path.join(userDir, `${funko.id}.json`);

  return fs.ensureDir(userDir)
    .then(() => fs.pathExists(filePath))
    .then((exists) => {
      if (exists) {
        return Promise.reject(new Error(`Funko with ID ${funko.id} already exists`));
      }
      return fs.writeJson(filePath, funko);
    });
};

export const updateFunko = (user: string, funko: Funko): Promise<void> => {
  const filePath = path.join(basePath, user, `${funko.id}.json`);

  return fs.pathExists(filePath)
    .then((exists) => {
      if (!exists) {
        return Promise.reject(new Error(`Funko with ID ${funko.id} not found`));
      }
      return fs.writeJson(filePath, funko);
    });
};

export const deleteFunko = (user: string, id: number): Promise<void> => {
  const filePath = path.join(basePath, user, `${id}.json`);

  return fs.pathExists(filePath)
    .then((exists) => {
      if (!exists) {
        return Promise.reject(new Error(`Funko with ID ${id} not found`));
      }
      return fs.remove(filePath);
    });
};

export const listFunkos = (user: string): Promise<Funko[]> => {
  const userDir = path.join(basePath, user);

  return fs.pathExists(userDir)
    .then((exists) => {
      if (!exists) {
        return [];
      }
      return fs.readdir(userDir);
    })
    .then((files) => {
      const funkoPromises = files.map(file => fs.readJson(path.join(userDir, file)));
      return Promise.all(funkoPromises);
    });
};

export const getFunko = (user: string, id: number): Promise<Funko> => {
  const filePath = path.join(basePath, user, `${id}.json`);

  return fs.pathExists(filePath)
    .then((exists) => {
      if (!exists) {
        return Promise.reject(new Error(`Funko with ID ${id} not found`));
      }
      return fs.readJson(filePath);
    });
};
