import { Schema, model, type Document, Types, CallbackError } from 'mongoose';
import bcrypt from 'bcrypt';

// import models
import type { MediaDocument } from './Media.js';
import type { PetDocument } from './Pet.js';
import type { LocationDocument } from './Location.js';
import type { PostDocument } from './Post.js';
import type { UserDocument } from './User.js';

// User schema
export interface OrgDocument extends Document {
  id: string;
  orgName: string;
  email: string;
  phone: string;
  website: string;
  password: string;
  isCorrectPassword(password: string): Promise<boolean>;
  avatar: Types.ObjectId | MediaDocument;
  about: string;
  location: Types.ObjectId | LocationDocument;
  employees: Types.ObjectId[] | UserDocument[];
  employeeCount: number;
  pets: Types.ObjectId[] | PetDocument[];
  petCount: number;
  posts: Types.ObjectId[] | PostDocument[];
  postCount: number;
  likedPosts: Types.ObjectId[] | PostDocument[];
  likedPostsCount: number;
  following: (Types.ObjectId | UserDocument | OrgDocument)[];
  followedBy: (Types.ObjectId | UserDocument | OrgDocument)[];
  followedByCount: number;
  followingCount: number;
}

const orgSchema = new Schema<OrgDocument>(
  {
    orgName: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    email: {
        type: String,
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
    employees: [  
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
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
  },
  // set this to use virtual below
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
  }
);

// hash org password
orgSchema.pre('save', async function (next) {
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

// Index the orgName and email fields for faster lookups
orgSchema.index({ username: 1, email: 1 });

// custom method to compare and validate password for logging in
orgSchema.methods.isCorrectPassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

orgSchema.virtual('employeeCount').get(function () {
  return this.employees.length;
});

orgSchema.virtual('petCount').get(function () {
  return this.pets.length;
});

orgSchema.virtual('postCount').get(function () {
  return this.posts.length;
});

orgSchema.virtual('likedPostsCount').get(function () {
  return this.likedPosts.length;
});

const Org = model<OrgDocument>('Org', orgSchema);

export default Org;
