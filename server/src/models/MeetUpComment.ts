import { Schema, model, type Document, type Types } from 'mongoose';

// import models
import type { OrgDocument } from './Org.js';
import type { UserDocument } from './User.js';
import type { MediaDocument } from './Media.js';

export interface MeetUpCommentDocument extends Document {
  id: string;
  poster: {
    refId: Types.ObjectId | UserDocument | OrgDocument;
    refModel: 'User' | 'Org';
  };
  contentText: string;
  media: Types.ObjectId[] | MediaDocument[];
  responses: Types.ObjectId[] | MeetUpCommentDocument[];
  responseCount: number;
  parentPost: Types.ObjectId | MeetUpCommentDocument;
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
                ref: 'Post'
            }
        ],
        parentPost: {
            type: Schema.Types.ObjectId,
            ref: 'Post',
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
  return !!this.parentPost;
});

const MeetUpComment = model<MeetUpCommentDocument>('MeetUpComment', meetUpCommentSchema);

export default MeetUpComment;
