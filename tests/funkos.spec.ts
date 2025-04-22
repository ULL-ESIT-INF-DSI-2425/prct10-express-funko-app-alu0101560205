import { describe, it, expect, beforeAll, afterAll, vi } from 'vitest';
import * as controller from '../src/funkos/controllers/funkoController.js';
import * as fs from 'fs-extra';
import mockFs from 'mock-fs';  // Para simular el sistema de archivos
import express from 'express';
import request from 'supertest';
import { funkoRouter } from '../src/funkos/routes/funkoroutes.js';

const app = express();
app.use(express.json());
app.use('/funkos', funkoRouter);

describe('Funko Controller and Routes Tests', () => {

  beforeAll(() => {
    // Configurar mock del sistema de archivos
    mockFs({
      './data': {
        'juan': {
          '1.json': '{"id": 1, "name": "Spiderman", "description": "Spiderman Funko"}'
        }
      }
    });
  });

  afterAll(() => {
    // Limpiar después de las pruebas
    mockFs.restore();
  });

  describe('Funko Controller Tests', () => {
    it('should save a funko successfully', () => {
      const newFunko = {
        id: 2,
        name: 'Iron Man',
        description: 'Iron Man Funko',
        type: 'Pop!',
        genre: 'Movies',
        franchise: 'Marvel',
        number: 102,
        exclusive: false,
        specialFeatures: 'None',
        marketValue: 19.99
      };

      const user = 'juan';

      // Mockear las funciones de fs
      vi.spyOn(fs, 'ensureDir').mockResolvedValue();
      vi.spyOn(fs, 'writeJson').mockResolvedValue();

      return controller.saveFunko(user, newFunko)
        .then(() => {
          // Verificar que la función fs.ensureDir y fs.writeJson fueron llamadas
          expect(fs.ensureDir).toHaveBeenCalled();
          expect(fs.writeJson).toHaveBeenCalled();
        });
    });

    it('should throw an error when trying to save a funko with an existing ID', () => {
      const existingFunko = {
        id: 1,
        name: 'Spiderman',
        description: 'Spiderman Funko',
        type: 'Pop!',
        genre: 'Movies',
        franchise: 'Marvel',
        number: 101,
        exclusive: false,
        specialFeatures: 'None',
        marketValue: 20.99
      };

      const user = 'juan';

      // Probar que se lanza un error cuando el Funko ya existe
      return controller.saveFunko(user, existingFunko)
        .then(() => {
          // Esto no debería ejecutarse, ya que debería lanzar un error
          throw new Error('Expected error not thrown');
        })
        .catch((error) => {
          expect(error.message).toBe('Funko with ID 1 already exists');
        });
    });

    it('should update a funko successfully', () => {
      const updatedFunko = {
        id: 1,
        name: 'Spiderman Updated',
        description: 'Updated Spiderman Funko',
        type: 'Pop!',
        genre: 'Movies',
        franchise: 'Marvel',
        number: 101,
        exclusive: false,
        specialFeatures: 'None',
        marketValue: 22.99
      };

      const user = 'juan';

      vi.spyOn(fs, 'writeJson').mockResolvedValue();

      return controller.updateFunko(user, updatedFunko)
        .then(() => {
          expect(fs.writeJson).toHaveBeenCalledWith('./data/juan/1.json', updatedFunko);
        });
    });

    it('should delete a funko successfully', () => {
      const user = 'juan';
      const id = 1;

      vi.spyOn(fs, 'remove').mockResolvedValue();

      return controller.deleteFunko(user, id)
        .then(() => {
          expect(fs.remove).toHaveBeenCalledWith('./data/juan/1.json');
        });
    });
  });

  describe('Funko Routes Tests', () => {
    it('should add a new funko (POST /funkos)', () => {
      const newFunko = {
        user: 'juan',
        funko: {
          id: 2,
          name: 'Iron Man',
          description: 'Iron Man Funko',
          type: 'Pop!',
          genre: 'Movies',
          franchise: 'Marvel',
          number: 102,
          exclusive: false,
          specialFeatures: 'None',
          marketValue: 19.99
        }
      };

      return request(app)
        .post('/funkos')
        .send(newFunko)
        .then((response) => {
          expect(response.status).toBe(200);
          expect(response.body.success).toBe(true);
          expect(response.body.message).toBe('Funko added successfully');
        });
    });

    it('should list all funkos (GET /funkos)', () => {
      return request(app)
        .get('/funkos?user=juan')
        .then((response) => {
          expect(response.status).toBe(200);
          expect(response.body.success).toBe(true);
          expect(response.body.funkoPops).toBeInstanceOf(Array);
          expect(response.body.funkoPops.length).toBe(1);  // Solo un funko para el usuario "juan"
        });
    });

    it('should delete a funko (DELETE /funkos)', () => {
      const funkoToDelete = { user: 'juan', id: 1 };

      return request(app)
        .delete('/funkos')
        .send(funkoToDelete)
        .then((response) => {
          expect(response.status).toBe(200);
          expect(response.body.success).toBe(true);
          expect(response.body.message).toBe('Funko deleted successfully');
        });
    });
  });
});
