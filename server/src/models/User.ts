import { Schema, model, type Document, Types, CallbackError } from 'mongoose';
import bcrypt from 'bcrypt';
// import autopopulate from 'mongoose-autopopulate';

// import models
import type { MediaDocument } from './Media.js';
import type { PetDocument } from './Pet.js';
import type { LocationDocument } from './Location.js';
import type { PostDocument } from './Post.js';
import type { ConversationDocument } from './Conversation.js';
import type { MeetUpDocument } from './MeetUp.js';
import type { OrgDocument } from './Org.js';

// User schema
export interface UserDocument extends Document {
  id: string;
  username: string;
  fullName: string;
  email: string;
  password: string;
  isCorrectPassword(password: string): Promise<boolean>;
  avatar: Types.ObjectId | MediaDocument;
  about: string;
  location: Types.ObjectId | LocationDocument;
  pets: Types.ObjectId[] | PetDocument[];
  petCount: number;
  meetUps: Types.ObjectId[] | MeetUpDocument[];
  meetUpCount: number;
  posts: Types.ObjectId[] | PostDocument[];
  postCount: number;
  likedPosts: Types.ObjectId[] | PostDocument[];
  likedPostsCount: number;
  following: [{
    refId: Types.ObjectId | UserDocument | OrgDocument | PetDocument;
    refModel: 'User' | 'Org' | 'Pet';
  }];
  followedBy: [{
    refId: Types.ObjectId | UserDocument | OrgDocument;
    refModel: 'User' | 'Org';
  }];
  followedByCount: number;
  followingCount: number;
  conversation: Types.ObjectId[] | ConversationDocument[];
  conversationCount: number;
  organizations: Types.ObjectId[] | OrgDocument[];
}

const userSchema = new Schema<UserDocument>(
  {
    username: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    fullName: {
      type: String,
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
        ref: 'Media'
    },
    about: {
        type: String,
    },
    location: {
        type: Schema.Types.ObjectId,
        ref: 'Location'
    },
    pets: [  
        {
            type: Schema.Types.ObjectId,
            ref: 'Pet'
        }
    ],
    posts: [  
        {
            type: Schema.Types.ObjectId,
            ref: 'Post'
        }
    ],
    likedPosts: [  
        {
            type: Schema.Types.ObjectId,
            ref: 'Post'
        }
    ],
    meetUps: [  
        {
            type: Schema.Types.ObjectId,
            ref: 'MeetUp'
        }
    ],
    conversation: [  
        {
            type: Schema.Types.ObjectId,
            ref: 'Conversation'
        }
    ],
    organizations: [
        {   
            type: Schema.Types.ObjectId,
            ref: 'Org'
        },
    ],
    following: [  
        {
            _id: false,
            refId: {
                type: Schema.Types.ObjectId,
                refPath: 'following.refModel',
                //autopopulate: true,
            },
            refModel: {
                type: String,
                enum: ['User', 'Org', 'Pet'],
            },
        }
    ],
    followedBy: [
        {
            _id: false,
            refId: {
                type: Schema.Types.ObjectId,
                refPath: 'followedBy.refModel',
                //autopopulate: true,
            },
            refModel: {
                type: String,
                enum: ['User', 'Org'],
            },
        }
    ],
  },
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

userSchema.virtual('petCount').get(function () {
  return this.pets.length;
});

userSchema.virtual('postCount').get(function () {
  return this.posts.length;
});

userSchema.virtual('conversationCount').get(function () {
  return this.conversation.length;
});

userSchema.virtual('meetUpCount').get(function () {
  return this.meetUps.length;
});

userSchema.virtual('likedPostsCount').get(function () {
  return this.likedPosts.length;
});

userSchema.virtual('followingCount').get(function () {
  return this.following.length;
});

userSchema.virtual('followedByCount').get(function () {
  return this.followedBy.length;
});

//userSchema.plugin(autopopulate);

const User = model<UserDocument>('User', userSchema);

export default User;
