import { Schema, model, type Document, Types, CallbackError } from 'mongoose';
import bcrypt from 'bcrypt';

// import models
import type { AvatarDocument } from './Avatar.js';
import type { PetDocument } from './Pet.js';
import type { LocationDocument } from './Location.js';
import type { PostDocument } from './Post.js';
import type { ConversationDocument } from './Conversation.js';

// User schema
export interface UserDocument extends Document {
  id: string;
  username: string;
  email: string;
  password: string;
  isCorrectPassword(password: string): Promise<boolean>;
  avatar: Types.ObjectId | AvatarDocument;
  about: string;
  location: Types.ObjectId | LocationDocument;
  pet: Types.ObjectId[] | PetDocument[];
  petCount: number;
  post: Types.ObjectId[] | PostDocument[];
  postCount: number;
  following: UserDocument[];
  conversation: Types.ObjectId[] | ConversationDocument[];
  conversationCount: number;
}

const userSchema = new Schema<UserDocument>(
  {
    username: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Must use a valid email address'],
        index: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: Schema.Types.ObjectId,
        ref: 'Avatar'
    },
    about: {
        type: String,
    },
    location: {
        type: Schema.Types.ObjectId,
        ref: 'Location'
    },
    pet: [  
        {
            type: Schema.Types.ObjectId,
            ref: 'Pet'
        }
    ],
    post: [  
        {
            type: Schema.Types.ObjectId,
            ref: 'Post'
        }
    ],
    following: [
        {   
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
    ],
    conversation: [  
        {
            type: Schema.Types.ObjectId,
            ref: 'Conversation'
        }
    ]
  },
  // set this to use virtual below
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
  }
);

// hash user password
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    try {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    } catch (err) {
        console.error('Error hashing password:', err);
        return next(err as CallbackError);
    }
  }
  next();
});

// Index the username and email fields for faster lookups
userSchema.index({ username: 1, email: 1 });

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

// when we query a user, we'll also get another field called `petCount` with the number of pets we have
userSchema.virtual('petCount').get(function () {
  return this.pet.length;
});

// when we query a user, we'll also get another field called `postCount` with the number of posts we have
userSchema.virtual('postCount').get(function () {
  return this.post.length;
});

// when we query a user, we'll also get another field called `conversationCount` with the number of conversations we have
userSchema.virtual('conversationCount').get(function () {
  return this.conversation.length;
});

const User = model<UserDocument>('User', userSchema);

export default User;
