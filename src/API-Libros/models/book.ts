import { Document, Schema, model } from 'mongoose';
import { UserDocumentInterface } from './user.js';


interface BookDocumentInterface extends Document {
  title: string,
  author: string,
  date?: string,
  owner: UserDocumentInterface,
}

const BookSchema = new Schema<BookDocumentInterface>({
  title: {
    type : String,
    required: true,
    trim: true, // Eliminar espacios en blanco al principio y al final
    validate: (value: string) => {
      if (!value.match(/^[A-Z]/)) {
        throw new Error('Note title must start with a capital letter');
      }
    },
  }, 
  author: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: String,
    trim:true,
    default: "12/12/2004"
  },
  owner: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User' 
  }
});

export const Book = model<BookDocumentInterface>('Book', BookSchema);