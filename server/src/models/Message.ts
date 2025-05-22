import { Schema, model, type Document, type Types } from 'mongoose';

// import models
import type { UserDocument } from './User.js';
import type { MediaDocument } from './Media.js';

export interface MessageDocument extends Document {
  id: string;
  messageUser: Types.ObjectId | UserDocument;
  textContent: string;
  media: Types.ObjectId[] | MediaDocument[];
  readUser: Types.ObjectId[] | UserDocument[];
  isRead: boolean;
  itemType: string;
}

const messageSchema = new Schema<MessageDocument>({
  messageUser: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
  },
  textContent: {
    type: String,
  },
  media: [
                {
                    type: Schema.Types.ObjectId,
                    ref: 'Media'
                }
  ],
  readUser: [
                    {
                        type: Schema.Types.ObjectId,
                        ref: 'User'
                    }
  ],
  itemType: {
    type: String,
    default: 'message'
  }
},
{
  timestamps: true,
  toJSON: {
    virtuals: true,
    getters: true,
  }
});

messageSchema.virtual('isRead').get(function (this: MessageDocument) {
  return this.readUser.length > 0;
});

const Message = model<MessageDocument>('Message', messageSchema);

export default Message;
