import { Schema, model, type Document, type Types } from 'mongoose';

// import models
import type { OrgDocument } from './Org.js';
import type { UserDocument } from './User.js';
import type { MediaDocument } from './Media.js';
import type { MeetUpDocument } from './MeetUp.js';

export interface MeetUpCommentDocument extends Document {
  id: string;
  poster: {
    refId: Types.ObjectId | UserDocument | OrgDocument;
    refModel: 'User' | 'Org';
  };
  meetUpId: Types.ObjectId | MeetUpDocument;
  contentText: string;
  media: Types.ObjectId[] | MediaDocument[];
  responses: Types.ObjectId[] | MeetUpCommentDocument[];
  responseCount: number;
  parentComment: Types.ObjectId | MeetUpCommentDocument;
  isResponse: boolean;
  createdAt: Date;
}

const meetUpCommentSchema = new Schema<MeetUpCommentDocument>(
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
        meetUpId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'MeetUp'
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
        responses: [
            {
                type: Schema.Types.ObjectId,
                ref: 'MeetUpComment'
            }
        ],
        parentComment: {
            type: Schema.Types.ObjectId,
            ref: 'MeetUpComment',
            default: null, // null means it's a top-level post
        },
        createdAt: {
            type: Date,
            default: Date.now,
        }
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
});

meetUpCommentSchema.virtual('responseCount').get(function () {
  return this.responses.length;
});

meetUpCommentSchema.virtual('isResponse').get(function () {
  return !!this.parentComment;
});

const MeetUpComment = model<MeetUpCommentDocument>('MeetUpComment', meetUpCommentSchema);

export default MeetUpComment;
