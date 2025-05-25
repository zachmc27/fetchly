import { Schema, model, type Document, type Types } from 'mongoose';

// import models
import type { OrgDocument } from './Org.js';
import type { UserDocument } from './User.js';
import type { MediaDocument } from './Media.js';
import type { MeetUpCommentDocument } from './MeetUpComment.js';
import type { LocationDocument } from './Location.js';

export interface MeetUpDocument extends Document {
  id: string;
  title: string;
  poster: {
    refId: Types.ObjectId | UserDocument | OrgDocument;
    refModel: 'User' | 'Org';
  };
  description: string;
  location: Types.ObjectId | LocationDocument;
  date: Date;
  time: string;
  attendees: Types.ObjectId[] | UserDocument[];
  numberOfAttendees: number;
  comments: Types.ObjectId[] | MeetUpCommentDocument[];
  numberOfComments: number;
  media: Types.ObjectId[] | MediaDocument[];
  createdAt: Date;
  itemType: string;
}

const postSchema = new Schema<MeetUpDocument>(
    {   
        title: {
            type: String,
            required: true,
        },
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
        description: {
            type: String,
            required: true,
        },
        location: {
            type: Schema.Types.ObjectId,
            ref: 'Location'
        },
        date: {
            type: Date,
            required: true,
        },
        time: {
            type: String,
            required: true,
        },
        attendees: {
            type: [
                {
                    type: Schema.Types.ObjectId,
                    ref: 'User'
                }
            ],
        },
        comments: {
            type: [
                {
                    type: Schema.Types.ObjectId,
                    ref: 'MeetUpComment'
                }
            ],
            default: []
        },
        media: {
            type: [
                {
                    type: Schema.Types.ObjectId,
                    ref: 'Media'
                }
            ],
            default: []
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        itemType: {
            type: String,
            default: 'meetup'
        }
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
});

postSchema.virtual('numberOfAttendees').get(function () {
  return Array.isArray(this.attendees) ? this.attendees.length : 0;
});

postSchema.virtual('numberOfComments').get(function () {
  return Array.isArray(this.comments) ? this.comments.length : 0;
});

const Meetup = model<MeetUpDocument>('MeetUp', postSchema);

export default Meetup;
