import { User } from '../../models/index.js';
import { signToken, AuthenticationError } from '../../utils/auth.js'; 

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

const userResolvers = {
  Query: {
    // User Queries
    users: async () => {
      return await User.find();
    },
    user: async (_parent: any, { userId }: UserArgs) => {
      return await User.findById(userId);
    },
    me: async (_parent: any, _args: any, context: any) => {
      if (context.user) {
        return await User.findOne({ _id: context.user._id });
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
  },
};

export default userResolvers;
