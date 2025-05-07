import express from "express";
import { Song } from "../models/song.js"

export const songRouter = express.Router();

/**
 * Metodo post para poder crear una canción en la base de datos
 */
songRouter.post("/songs", async (req, res) => {
  try {
    const song = new Song({
      ...req.body,
    });
    await song.save();
    res.status(201).send(song);
  } catch (error) {
    res.status(500).send(error);
  }
});

/**
 * Metodo get para obtener todas las canciones almacenadas en la BBDD
 */
songRouter.get("/songs", async (req, res) => {
  try {
    const song = await Song.find();
    if (song) {
      res.send(song);
    } else {
      res.status(404).send();
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

/** 
 * Metodo para obtener una cancion segun su nombre
 */
songRouter.get('/songs/:title', async (req, res) => {
  try {
    const song = await Song.findOne({
      title: req.params.title,
    });
    if (song) {
      res.send(song);
    } else {
      res.send("Entre en title");
      res.status(404).send();
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

/**
 * Metodo para obtener una cancion por su autor
 */
songRouter.get('/songs/:author', async (req, res) => {
  try {
    const song = await Song.find({
      author: req.params.author,
    });
    if (song) {
      res.send(song);
    } else {
      res.send("Entre aqui en author");
      res.status(404).send();
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

/**
 * Metodo para poder actualizar una cancion segun su ID
 */
songRouter.patch("/songs/:id", async (req, res) => {
  try {
    const allowedUpdates = ["title", "duration", "author", "gender"];
    const actualUpdates = Object.keys(req.body);
    const isValidUpdate = actualUpdates.every((update) =>
      allowedUpdates.includes(update),
    );

    if (!isValidUpdate) {
      res.status(400).send({
      error: "Update is not permitted",
    });
    } else {
      const song = await Song.findOneAndUpdate({
        _id: req.params.id,
      },
      req.body,
      {
        new: true,
        runValidators: true,
      });

      if (song) {
        res.send(song);
      } else {
        res.status(404).send();
      }
    }
  } catch (error) {
    res.status(500).send(error);
  }
});


/**
 * Metodo para borrar una cancion dado su ID
 */
songRouter.delete("/songs/:id", async (req, res) => {
  try {
    const song = await Song.findOneAndDelete({
      _id: req.params.id,
    })

    if (song) {
      res.send(song);
    } else {
      res.status(404).send();
    }
  } catch (error) {
    res.status(500).send(error);
  }
});