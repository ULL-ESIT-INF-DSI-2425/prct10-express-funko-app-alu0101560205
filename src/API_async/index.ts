import express from 'express';
import './db/mongoose.js';
import { noteRouter } from './routers/note.js';
import { defaultRouter } from './routers/default.js';
import { userRouter } from './routers/user.js';

const app = express();
app.use(express.json());

app.use(noteRouter);
app.use(userRouter);
// El default debe ser el último router
app.use(defaultRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});