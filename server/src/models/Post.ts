import { Schema, model, type Document, type Types } from 'mongoose';

// import models
import type { OrgDocument } from './Org.js';
import type { UserDocument } from './User.js';
import type { MediaDocument } from './Media.js';

export interface PostDocument extends Document {
  id: string;
  poster: {
    refId: Types.ObjectId | UserDocument | OrgDocument;
    refModel: 'User' | 'Org';
  };
  contentText: string;
  media: Types.ObjectId[] | MediaDocument[];
  responses: Types.ObjectId[] | PostDocument[];
  responseCount: number;
  parentPost: Types.ObjectId | PostDocument;
  isResponse: boolean;
}

const postSchema = new Schema<PostDocument>(
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
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
});

postSchema.virtual('responseCount').get(function () {
  return this.responses.length;
});

postSchema.virtual('isResponse').get(function () {
  return !!this.parentPost;
});

const Post = model<PostDocument>('Post', postSchema);

export default Post;
