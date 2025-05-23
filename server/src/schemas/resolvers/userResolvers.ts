import { User } from '../../models/index.js';
import { signToken, AuthenticationError } from '../../utils/auth.js'; 
import mongoose from 'mongoose';

//UserArgs
interface AddUserArgs {
  input:{
    username: string;
    email: string;
    password: string;
  }
}

interface LoginUserArgs {
  email: string;
  password: string;
}

interface UserArgs {
  userId: string;
}

interface UpdateUserArgs {
  userId: string;
  input:{
    username: string;
    email: string;
    avatar: String
    about: String
    location: String
  }
}

const userResolvers = {
  Query: {
    // User Queries
    users: async () => {
      return await User.find()
        .populate('pets')
        .populate('posts')
        .populate('avatar');
    },
    user: async (_parent: any, { userId }: UserArgs) => {
      return await User.findById(userId)
        .populate('pets')
        .populate('posts')
        .populate('avatar');
    },
    me: async (_parent: any, _args: any, context: any) => {
      if (context.user) {
        return await User.findOne({ _id: context.user._id })
          .populate('pets')
          .populate('posts');
      }
      throw new AuthenticationError('Could not authenticate user.');
    },
  },
    Mutation: {
    //User Mutations
    addUser: async (_parent: any, { input }: AddUserArgs) => {
      const user = await User.create({ ...input });
      const token = signToken(user.username, user.email, user._id);
      return { token, user };
    },
    loginUser: async (_parent: any, { email, password }: LoginUserArgs) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError('Could not authenticate user.');
      }

      const correctPw = await user.isCorrectPassword(password);
    
      if (!correctPw) {
        throw new AuthenticationError('Could not authenticate user.');
      }
    
      const token = signToken(user.username, user.email, user._id);
    
      return { token, user };
    },
    updateUser: async (_parent: any, { userId, input }: UpdateUserArgs, context: any) => {
      if (!context.user) {
        throw new AuthenticationError('You must be logged in to update an user.');
      }

      if (context.user._id.toString() !== userId) {
        throw new AuthenticationError('You are not authorized to update this user.');
      }

      const updateData = {
        ...input,
        avatar: typeof input.avatar === 'string' && input.avatar.trim() 
          ? new mongoose.Types.ObjectId(input.avatar) 
          : undefined, 
      };

      const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true })
        .populate('avatar').lean();

      if (updatedUser?.avatar?._id) {
        updatedUser.avatar._id = updatedUser.avatar._id.toString();
      }
      if (updatedUser?._id) {
        updatedUser._id = updatedUser._id.toString();
      }
      //console.log('updatedUser:', JSON.stringify(updatedUser, null, 2));
      return updatedUser;
    },
  },
};

export default userResolvers;