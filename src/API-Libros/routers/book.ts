import express from "express";
import { Book } from "../models/book.js";
import { User } from "../models/user.js";

export const bookRouter = express.Router();

bookRouter.post("/books/:username", async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.params.username,
    });

    if (!user) {
      res.status(404).send({
        error: "User not found",
      });
    } else {
      const book = new Book({
        ...req.body,
        owner: user._id,
      });

      await book.save();
      await book.populate({
        path: "owner",
        select: ["username"],
      });
      res.status(201).send(book);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});


bookRouter.get("/books/:username", async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.params.username,
    });

    if (!user) {
      res.status(404).send({
        error: "User not found",
      });
    } else {
      const book = await Book.find({
        owner: user._id,
      }).populate({
        path: "owner",
        select: ["username"],
      });

      if (book.length !== 0) {
        res.send(book);
      } else {
        res.status(404).send();
      }
    }
  } catch (error) {
    res.status(500).send(error);
  }
});


bookRouter.patch("/books/:username/:id", async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.params.username,
    });

    if (!user) {
      res.status(404).send({
        error: "User not found",
      });
    } else {
      const allowedUpdates = ["title", "author", "date"];
      const actualUpdates = Object.keys(req.body);
      const isValidUpdate = actualUpdates.every((update) =>
        allowedUpdates.includes(update),
      );

      if (!isValidUpdate) {
        res.status(400).send({
          error: "Update is not permitted",
        });
      } else {
        const book = await Book.findOneAndUpdate(
          {
            owner: user._id,
            _id: req.params.id,
          },
          req.body,
          {
            new: true,
            runValidators: true,
          },
        ).populate({
          path: "owner",
          select: ["username"],
        });

        if (book) {
          res.send(book);
        } else {
          res.status(404).send();
        }
      }
    }
  } catch (error) {
    res.status(500).send(error);
  }
});