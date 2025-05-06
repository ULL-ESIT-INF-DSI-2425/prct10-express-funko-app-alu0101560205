import { Document, connect, model, Schema } from 'mongoose';

connect('mongodb://127.0.0.1:27017/notes-app').then(() => {
  console.log('Connected to the database');
}).catch(() => {
  console.log('Something went wrong when conecting to the database');
});

interface NoteDocumentInterface extends Document {
  title: string,
  body: string,
  color?: 'blue' | 'green' | 'red' | 'yellow' | 'magenta'
}

// un esquema es el mecanismo por el cual podemos modelar un objeto en Mongoose, permite definir el tipo de cada una de las 
// propiedades del objeto, si son obligatorias o no e, incluso, permite validar sus valores antes de ser almacenados en la base de datos.

// un modelo nos va a permitir instanciar y almacenar en la base de datos documentos que se ajusten a un esquema concreto

const NoteSchema = new Schema<NoteDocumentInterface>({
  title: {
    type: String,
    required: true,
    validate: (value: string) => {
      if (!value.match(/^[A-Z]/)) {
        throw new Error('Note title must start with a capital letter');
      }
    },
  },
  body: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: 'yellow',
    enum: ['blue', 'green', 'red', 'yellow', 'magenta'],
  },
});

const Note = model<NoteDocumentInterface>('Note', NoteSchema); // Como el modelo se llama Note, en la base de datos se va a crear una colección llamada notes, que es el plural de Note. Si el modelo se llamara User, la colección se llamaría users

const note = new Note({
  title: 'Black note',
  body: 'This is a black note',
  color: 'black',
});

note.save().then((result) => {
  console.log(result);
}).catch((error) => {
  console.log(error);
});