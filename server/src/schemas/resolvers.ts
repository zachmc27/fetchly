import { Org, Post, User } from '../models/index.js';
import { signToken, AuthenticationError } from '../utils/auth.js'; 

// Define types for the arguments

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

//OrgArgs
interface AddOrgArgs {
  input:{
    orgName: string;
    email: string;
    password: string;
  }
}

interface LoginOrgArgs {
  email: string;
  password: string;
}

interface OrgArgs {
  orgName: string;
}

// PostArgs
interface AddPostArgs {
    input:{
        postId: string;
        poster: {
            refId: string;
            refModel: string;
        };
        postType: string;
        contentText: string;
        media: string[];

    }
}

interface PostArgs {
  postId: string;
  poster: {
    refId: string;
    refModel: string;
  };
  postType: string;
}

const resolvers = {
  Query: {
    // User Queries
    users: async () => {
      return User.find().populate('pet');
    },
    user: async (_parent: any, { userId }: UserArgs) => {
      return User.findById(userId).populate('pet');
    },
    me: async (_parent: any, _args: any, context: any) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('pet');
      }
      throw new AuthenticationError('Could not authenticate user.');
    },

    // Org Queries
    orgs: async () => {
      return await Org.find().populate('pet');
    },
    org: async (_parent: any, { orgName }: OrgArgs) => {
      return Org.findOne({ orgName }).populate('pet');
    },

    // Post Queries
    posts: async () => {
      return await Post.find();
    },
    post: async (_parent: any, { postId }: PostArgs) => {
      return await Post.findById(postId);
    },
    postType: async (_parent: any, { postType }: PostArgs) => {
      return await Post.findOne({ postType });
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

    //Org Mutations
    addOrg: async (_parent: any, { input }: AddOrgArgs) => {
      const org = await Org.create({ ...input });
      const token = signToken(org.orgName, org.email, org._id);
      return { token, org };
    },
    
    loginOrg: async (_parent: any, { email, password }: LoginOrgArgs) => {
      const org = await Org.findOne({ email });
      if (!org) {
        throw new AuthenticationError('Could not authenticate user.');
      }

      const correctPw = await org.isCorrectPassword(password);
    
      if (!correctPw) {
        throw new AuthenticationError('Could not authenticate user.');
      }
    
      const token = signToken(org.orgName, org.email, org._id);
    
      return { token, org };
    },

    // Post Mutations
    addPost: async (_parent: any, { input }: AddPostArgs) => {
      const post = await Post.create({ ...input });
      return post;
    }
  },
};

export default resolvers;
