import express from 'express';
import * as controller from '../controllers/funkoController.js';
import { Funko } from '../models/funko.js';

export const funkoRouter = express.Router();

/**
 * POST es para añadir un funko a la coleccion
 */
funkoRouter.post('/', (req, res) => {
  const { user, funko } = req.body as { user: string; funko: Funko };
  controller.saveFunko(user, funko)
    .then(() => {
      res.json({ success: true, message: 'Funko added successfully' });
    })
    .catch((error) => {
      res.status(400).json({ success: false, error: error.message });
    });
});

/**
 * PATCH es para actualizar un funko existente en la coleccion
 */
funkoRouter.patch('/', (req, res) => {
  const { user, funko } = req.body as { user: string; funko: Funko };
  controller.updateFunko(user, funko)
    .then(() => {
      res.json({ success: true, message: 'Funko updated successfully' });
    })
    .catch((error) => {
      res.status(400).json({ success: false, error: error.message });
    });
});

/**
 * DELETE es para eliminar un funko
 */
funkoRouter.delete('/', (req, res) => {
  const { user, id } = req.body as { user: string; id: number };
  controller.deleteFunko(user, id)
    .then(() => {
      res.json({ success: true, message: 'Funko deleted successfully' });
    })
    .catch((error) => {
      res.status(400).json({ success: false, error: error.message });
    });
});

/**
 * GET es para listar todos o mostrar uno solo
 */
funkoRouter.get('/', (req, res) => {
  const user = req.query.user as string;
  const id = req.query.id ? Number(req.query.id) : undefined;

  if (id !== undefined) {
    controller.getFunko(user, id)
      .then((funko) => {
        res.json({ success: true, funko });
      })
      .catch((error) => {
        res.status(400).json({ success: false, error: error.message });
      });
  } else {
    controller.listFunkos(user)
      .then((funkoPops) => {
        res.json({ success: true, funkoPops });
      })
      .catch((error) => {
        res.status(400).json({ success: false, error: error.message });
      });
  }
});
