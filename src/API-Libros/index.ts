import express from 'express';
import './db/mongoose.js';
import { bookRouter } from './routers/book.js';
import { defaultRouter } from './routers/default.js';
import { userRouter } from './routers/user.js';

const app = express();
app.use(express.json());
app.use(userRouter);
app.use(bookRouter);
// El default debe ser el último router
app.use(defaultRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});