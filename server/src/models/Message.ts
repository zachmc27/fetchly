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
  conversation: Types.ObjectId;
  isRead: boolean;
  itemType: string;
  createdAt: Date;
  formattedCreatedAt: string;
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
  conversation: {
    type: Schema.Types.ObjectId,
    ref: 'Conversation',
    required: true
  },
  itemType: {
    type: String,
    default: 'message'
  },
  createdAt: {
    type: Date,
    default: Date.now,
    
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    getters: true,
  }
});

messageSchema.virtual('isRead').get(function (this: MessageDocument) {
  return this.readUser.length > 0;
});

messageSchema.virtual('formattedCreatedAt').get(function (this: MessageDocument) {
  const pad = (n: number) => n.toString().padStart(2, '0');
  const date = new Date(this.createdAt);

  const MM = pad(date.getMonth() + 1);
  const DD = pad(date.getDate());
  const YYYY = date.getFullYear();
  const HH = pad(date.getHours());
  const mm = pad(date.getMinutes());
  const ss = pad(date.getSeconds());

  return `${MM}-${DD}-${YYYY} ${HH}:${mm}:${ss}`;
});

const Message = model<MessageDocument>('Message', messageSchema);

export default Message;
