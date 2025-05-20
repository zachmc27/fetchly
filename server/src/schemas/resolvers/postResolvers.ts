import { Post, User, Org } from '../../models/index.js';
import { type Types } from 'mongoose';

// PostArgs
interface AddPostArgs {
    input:{
        poster: {
            refId: string;
            refModel: string;
        };
        contentText?: string;
        media?: string[];
    }
}

interface UpdatePostArgs {
    postId: string;
    input: {
        contentText?: string;
        media?: string[];
    }
}

interface AddPostResponseArgs {
    postId: string;
    input: {
        poster: {
            refId: string;
            refModel: string;
        };
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
        return await Post.find()
          .populate('media')
          .populate('responses');
      },
      post: async (_parent: any, { postId }: PostArgs) => {
        return await Post.findById(postId)
          .populate('media')
          .populate('responses');
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
      },
      addPostResponse: async (_parent: any, { postId, input }: AddPostResponseArgs) => {
        const parentPost = await Post.findById(postId);
        if (!parentPost) {
          throw new Error('No Parent Post found');
        }
        const response = await Post.create({ 
          ...input, 
          parentPost: postId, 
        });
        (parentPost.responses as Types.ObjectId[])
          .push(response._id as Types.ObjectId);
        await parentPost.save();

        const { refId, refModel } = input.poster;

        if(refModel === 'User') {
          await User.findByIdAndUpdate(refId, {
            $addToSet: {posts: response._id }
          });
        } else if (refModel === 'Org') {
          await Org.findByIdAndUpdate(refId, {
            $addToSet: {posts: response._id }
          });
        }
        return response;
      },
      updatePost: async (_parent: any, { postId, input }: UpdatePostArgs) => {
        const post = await Post.findByIdAndUpdate(postId, input, {
          new: true,
          runValidators: true,
        }).populate('media');
        if (!post) {
          throw new Error('Post not found');
        }
        return post;
      },
      deletePost: async (_parent: any, { postId }: PostArgs) => {
        const post = await Post.findByIdAndDelete(postId);
        if (!post) {
          throw new Error('Post not found');
        }
        const { refId, refModel } = post.poster;
        if(refModel === 'User') {
          await User.findByIdAndUpdate(refId, {
            $pull: {posts: post._id }
          });
        } else if (refModel === 'Org') {
          await Org.findByIdAndUpdate(refId, {
            $pull: {posts: post._id }
          });
        }
        return post;
      }
    },
};

export default postResolvers;
