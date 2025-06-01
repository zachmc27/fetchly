import { Schema, model, type Document } from 'mongoose';

export interface LocationDocument extends Document {
  id: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zip: string;
}

const locationSchema = new Schema<LocationDocument>({
  address: { 
    type: String, 
  },
  city: { 
    type: String, 
  },
  state: { 
    type: String, 
  },
  country: { 
    type: String, 
    required: true 
  },
  zip: { 
    type: String, 
    required: true 
  }
});

const Location = model<LocationDocument>('Location', locationSchema);

export default Location;