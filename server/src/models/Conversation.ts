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
}

const conversationSchema = new Schema<ConversationDocument>({
  conversationName: {  
        type: String,
        required: true
  },
  conversationUsers: [  
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
  ],
  messages: [  
        {
            type: Schema.Types.ObjectId,
            ref: 'Message'
        }
  ],
  lastMessage: {  
            type: Schema.Types.ObjectId,
            ref: 'Message'
  }
});

const Conversation = model<ConversationDocument>('Conversation', conversationSchema);

export default Conversation;
