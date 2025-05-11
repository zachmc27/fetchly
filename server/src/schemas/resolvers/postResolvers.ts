import { Post } from '../../models/index.js';

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

const postResolvers = {
    Query: {
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
    // Post Mutations
    addPost: async (_parent: any, { input }: AddPostArgs) => {
      const post = await Post.create({ ...input });
      return post;
    }
    },
};

export default postResolvers;
