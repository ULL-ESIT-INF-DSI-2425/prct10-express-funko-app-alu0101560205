import { Document, Schema, model } from 'mongoose';

/**
 * Definimos la interfaz de las canciones
 */
interface SongDocumentInterface extends Document {
  title: string,
  duration: number,
  author: string,
  gender?: 'pop' | 'reggaeton' | 'rap' | 'rock',
}

const SongSchema = new Schema<SongDocumentInterface>({
  title: {
    type: String,
    required: true,
    trim: true,
    validate: (value: string) => {
      if (!value.match(/^[A-Z]/)) {
        throw new Error('Song title must start with a capital letter');
      }
    },
  },
  duration: {
    type: Number,
    required: true,
  },
  author: {
    type: String,
    required: true,
    trim: true,
  },
  gender: {
    type: String, 
    default: 'pop',
    enum: ['pop', 'reggaeton', 'rap', 'rock'],
  }
});

export const Song = model<SongDocumentInterface>('Song', SongSchema);