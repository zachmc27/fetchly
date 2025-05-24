import { Schema, model, type Document, type Types } from 'mongoose';

// import models
import type { TypeDocument } from './Type.js';
import type { MediaDocument } from './Media.js';
import type { OrgDocument } from './Org.js';
import type { UserDocument } from './User.js';

export interface PetDocument extends Document {
  id: string;
  name: string;
  owner: {
      refId: Types.ObjectId | UserDocument | OrgDocument;
      refModel: 'User' | 'Org';
  };
  type: Types.ObjectId | TypeDocument;
  gender: string;
  age: number;
  neuteredOrSpayed: boolean;
  about: string;
  profilePhoto: Types.ObjectId | MediaDocument;
  vaccination: string;
  followedBy: (Types.ObjectId | UserDocument | OrgDocument)[];
  followedByCount: number;
}

const petSchema = new Schema<PetDocument>({
  name: {
    type: String,
    required: true,
  },
  owner: {
    refId: {
      type: Schema.Types.ObjectId,
      required: true,
      refPath: 'poster.refModel'
    },
      refModel: {
      type: String,
      required: true,
      enum: ['User', 'Org'] // model names
    }
  },
  type: {
    type: Schema.Types.ObjectId,
    ref: 'Type',
    required: true,
  },
  gender: {
    type: String,
  },
  age: {
    type: Number,
  },
  neuteredOrSpayed: {
    type: Boolean,
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
