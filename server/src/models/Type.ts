import { Schema, model, type Document } from 'mongoose';

export interface TypeDocument extends Document {
  id: string;
  type: string;  // e.g., 'dog'
  breed: string; // e.g., 'Golden Retriever'
}

const typeSchema = new Schema<TypeDocument>({
  type: { 
    type: String, 
    required: true 
  },
  breed: { 
    type: String, 
    required: true 
  }
});

const Type = model<TypeDocument>('Type', typeSchema);

export default Type;