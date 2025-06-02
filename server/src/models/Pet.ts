import { Schema, model, type Document, type Types } from 'mongoose';

// import models
import type { TypeDocument } from './Type.js';
import type { MediaDocument } from './Media.js';
import type { OrgDocument } from './Org.js';
import type { UserDocument } from './User.js';
import type { PostDocument } from './Post.js'

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
  size: string;
  neuteredOrSpayed: boolean;
  about: string;
  profilePhoto: Types.ObjectId | MediaDocument;
  vaccination: string;
  followedBy: [{
    refId: Types.ObjectId | UserDocument | OrgDocument;
    refModel: 'User' | 'Org';
  }];
  followedByCount: number;
  taggedPosts:  Types.ObjectId | PostDocument;
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
      refPath: 'owner.refModel'
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
  size: {
    type: String,
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
  },
  followedBy: [
      {
          _id: false,
          refId: {
              type: Schema.Types.ObjectId,
              refPath: 'followedBy.refModel',
          },
          refModel: {
              type: String,
              enum: ['User', 'Org'],
          },
      }
  ],  
  taggedPosts: [{
    type: Schema.Types.ObjectId,
    ref: 'Post',    
  }]
},  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
  });

petSchema.virtual('followedByCount').get(function (this: PetDocument) {
  return this.followedBy.length;
});

const Pet = model<PetDocument>('Pet', petSchema);

export default Pet;
