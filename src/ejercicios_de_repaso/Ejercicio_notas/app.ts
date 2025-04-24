import express from "express";
import { readNote } from "./notes-promises.js";

const app = express();

app.get("/notes", (req, res) => {
  const title = req.query.title as string;
  if (!title) {
    res.status(400).send({
      error: "A title has to be provided",
    });
    return;
  }
  const direccion = "notes.json";
  readNote(title, direccion).then((data) => {
    if (!data.success) {
      res.status(404).send({ error: "No note was found" });
    } else {
      res.send({ notes: data.notes });
    }
  }).catch((err) => {
      res.status(500).send({ error: err.message });
    });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});