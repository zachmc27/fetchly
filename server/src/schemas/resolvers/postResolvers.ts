import { Post, User, Org } from '../../models/index.js';
import { type Types } from 'mongoose';
import mongoose from 'mongoose';

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

interface LikePostArgs {
    postId: string;
    input: {
        refId: string;
        refModel: 'User' | 'Org';
    };
}

const postResolvers = {

    // Post Queries
    Query: {
      posts: async () => {
        return await Post.find()
          .populate('media')
          .populate({
            path: 'responses',
            populate: {
              path: 'poster.refId',
          }})
          .populate('poster.refId')
          .populate({
            path: 'likes.refId'
          });
      },
      post: async (_parent: any, { postId }: PostArgs) => {
        return await Post.findById(postId)
          .populate('media')
          .populate({
            path: 'responses',
            populate: {
              path: 'poster.refId',
          }})
          .populate('poster.refId')
          .populate({
            path: 'likes.refId'
          });
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
      likePost: async (_parent: any, { postId, input }: LikePostArgs) => {
        const post = await Post.findById(postId);
        if (!post) {
          return {
            messsage: 'Post not found',
            success: false,
          };
        }

        const { refId, refModel } = input;

        const alreadyLiked = post.likes.some(
          (like) => like.refId.toString() === refId && like.refModel === refModel
        );
        if (alreadyLiked) {
          return {
            message: 'Post already liked',
            success: false,
          };
        }

        post.likes.push({
          refId: new mongoose.Types.ObjectId(refId),
          refModel,
        });
        
        if(refModel === 'User') {
          await User.findByIdAndUpdate(refId, {
            $addToSet: {likedPosts: postId }
          });
        } else if (refModel === 'Org') {
          await Org.findByIdAndUpdate(refId, {
            $addToSet: {likedPosts: postId }
          });
        }

        await post.save();
        return {
          message: 'Post liked successfully',
          success: true,
        };
      },
      unlikePost: async (_parent: any, { postId, input }: LikePostArgs) => {
        const { refId, refModel } = input;        
        const post = await Post.findById(postId);
        if (!post) {
          return {
            message: 'Post not found',
            success: false,
          };
        }

        const existingLike = post.likes.some(
          (like) => 
            like.refId.toString() === refId && 
            like.refModel === refModel
        );

        if (!existingLike) {
          return {
            message: 'Like not found for this post',
            success: false,
          };
        }

        await Post.findByIdAndUpdate(postId, {
          $pull: {
            likes: {
              refId: new mongoose.Types.ObjectId(refId),
              refModel,
            },
          },
        });
        
        if(refModel === 'User') {
          await User.findByIdAndUpdate(refId, {
            $pull: {likedPosts: postId }
          });
        } else if (refModel === 'Org') {
          await Org.findByIdAndUpdate(refId, {
            $pull: {likedPosts: postId }
          });
        }

        return {
          message: 'Post unliked successfully',
          success: true,
        };
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
