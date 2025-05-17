import { Post, User, Org } from '../../models/index.js';

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

        const { refId, refModel } = input.poster;

        if(refModel === 'User') {
          await User.findByIdAndUpdate(refId, {
            $addToSet: {posts: post._id }
          });
        } else if (refModel === 'Org') {
          await Org.findByIdAndUpdate(refId, {
            $addToSet: {posts: post._id }
          });
        }
        return post;
      }
    },
};

export default postResolvers;
