import { Schema, model, type Document, type Types } from 'mongoose';

// import models
import type { TypeDocument } from './Type.js';
import type { MediaDocument } from './Media.js';

export interface PetDocument extends Document {
  id: string;
  name: string;
  type: Types.ObjectId | TypeDocument;
  gender: string;
  age: number;
  about: string;
  profilePhoto: Types.ObjectId | MediaDocument;
  vaccination: string;
}

const petSchema = new Schema<PetDocument>({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: Schema.Types.ObjectId,
    ref: 'Type',
  },
  gender: {
    type: String,
  },
  age: {
    type: Number,
  },
  about: {
    type: String,
  },
  profilePhoto: {
    type: Schema.Types.ObjectId,
    ref: 'Media',
  },
  vaccination: {
    type: String,
  }
});

const Pet = model<PetDocument>('Pet', petSchema);

export default Pet;
