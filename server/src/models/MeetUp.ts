import { Schema, model, type Document, type Types } from 'mongoose';

// import models
import type { OrgDocument } from './Org.js';
import type { UserDocument } from './User.js';
import type { MediaDocument } from './Media.js';

export interface MeetUpDocument extends Document {
  id: string;
  poster: {
    refId: Types.ObjectId | UserDocument | OrgDocument;
    refModel: 'User' | 'Org';
  };
  contentText: string;
  media: Types.ObjectId[] | MediaDocument[];
}

const postSchema = new Schema<MeetUpDocument>(
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
        contentText: {
            type: String,
        },
        media: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Media'
            }
        ],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
});

const Meetup = model<MeetUpDocument>('MeetUp', postSchema);

export default Meetup;
