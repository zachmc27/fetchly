import { Schema, model, type Document, type Types } from 'mongoose';

// import models
import type { UserDocument } from './User.js';
import type { MessageDocument } from './Message.js';

export interface ConversationDocument extends Document {
  id: string;
  conversationName: string;
  conversationUsers: Types.ObjectId[] | UserDocument[];
  messages: Types.ObjectId[] | MessageDocument[];
  lastMessage: Types.ObjectId | MessageDocument;
  createdAt: Date;
  formattedCreatedAt: string;
}

const conversationSchema = new Schema<ConversationDocument>({
  conversationName: {  
    type: String,
    required: true,
  },
  conversationUsers: [  
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  ],
  messages: [  
    {
      type: Schema.Types.ObjectId,
      ref: 'Message',
    },
  ],
  lastMessage: {  
    type: Schema.Types.ObjectId,
    ref: 'Message',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true, // Enables `createdAt` and `updatedAt` fields
  toJSON: {
    virtuals: true, // Includes virtual fields in JSON output
  },
});

conversationSchema.virtual('formattedCreatedAt').get(function (this: ConversationDocument) {
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

const Conversation = model<ConversationDocument>('Conversation', conversationSchema);

export default Conversation;
