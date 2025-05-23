import { Schema, model, type Document, type Types } from 'mongoose';

// import models
import type { OrgDocument } from './Org.js';
import type { UserDocument } from './User.js';
import type { MediaDocument } from './Media.js';
import type { PetDocument } from './Pet.js';
import type { LocationDocument } from './Location.js';

export interface AdoptionDocument extends Document {
  id: string;
  poster: {
    refId: Types.ObjectId | UserDocument | OrgDocument;
    refModel: 'User' | 'Org';
  };
  pet: Types.ObjectId | PetDocument
  goodWithPets: string;
  description: string;
  location: Types.ObjectId | LocationDocument;
  media: Types.ObjectId[] | MediaDocument[];
  adoptionStatus: boolean;
  adoptedBy: Types.ObjectId | UserDocument | OrgDocument;
  createdAt: Date;
  itemType: string;
}

const postSchema = new Schema<AdoptionDocument>(
    {
        poster: {
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
        pet: {
            type: Schema.Types.ObjectId,
            ref: 'Pet',
            required: true
        },
        goodWithPets: {
            type: String,
        },
        description: {
            type: String,
        },
        location: {
            type: Schema.Types.ObjectId,
            ref: 'Location'
        },
        media: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Media'
            }
        ],
        adoptionStatus: {
            type: Boolean,
            default: false
        },
        adoptedBy: {
            refId: {
                type: Schema.Types.ObjectId,
                refPath: 'adoptedBy.refModel'
            },
            refModel: {
                type: String,
                enum: ['User', 'Org']
            }
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        itemType: {
            type: String,
            default: 'adoption'
        }
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
});

const Adoption = model<AdoptionDocument>('Adoption', postSchema);

export default Adoption;
