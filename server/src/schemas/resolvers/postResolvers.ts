import { Post } from '../../models/index.js';

// PostArgs
interface AddPostArgs {
    input:{
        poster: {
            refId: string;
            refModel: string;
        };
        postType: string;
        contentText?: string;
        media?: string[];
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

    // Post Queries
    Query: {
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

    // Post Mutations
    Mutation: {
      addPost: async (_parent: any, { input }: AddPostArgs) => {
        const post = await Post.create({ ...input });
        return post;
      }
    },
};

export default postResolvers;
