import { User, Org, Pet } from '../../models/index.js';
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

interface LocationInput {
  address: string;
  city: string;
  state: string;
  country: string;
  zip: string;
}

interface UpdateUserArgs {
  userId: string;
  input:{
    username: string;
    email: string;
    avatar: String
    about: String
    location: LocationInput
  }
}

interface FollowArgs {
  userId: string;
  input: {
    refId: string;
    refModel: string;
  }
}

const userResolvers = {

  Query: {
    // User Queries
    users: async () => {
      return await User.find()
        .populate('pets')
        .populate('posts')
        .populate('avatar')
        .populate('meetUps')
        .populate('location')
        .populate('organizations')
        .populate({
          path: 'following.refId'
        })
        .populate({
          path: 'followedBy.refId'
        });
    },
    user: async (_parent: any, { userId }: UserArgs) => {
      return await User.findById(userId)
        .populate({
          path: 'pets',
          populate: {
            path: 'profilePhoto type',
          }})
        .populate('posts')
        .populate('avatar')
        .populate('meetUps')
        .populate('location')
        .populate('organizations')        
        .populate({
          path: 'following.refId'
        })
        .populate({
          path: 'followedBy.refId'
        });
    },
    userByUsername: async (_parent: any, { username }: { username: string }) => {
      return await User.find({ username })
        .populate({
          path: 'pets',
          populate: {
            path: 'profilePhoto type',
          }})
        .populate('posts')
        .populate('avatar')
        .populate('meetUps')
        .populate('location')
        .populate('organizations')
        .populate({
          path: 'following.refId'
        })
        .populate({
          path: 'followedBy.refId'
        });
    },
    me: async (_parent: any, _args: any, context: any) => {
      if (context.user) {
        return await User.findOne({ _id: context.user._id })
          .populate('pets')
          .populate('posts')
          .populate('avatar')
          .populate('location')
          .populate('organizations')        
          .populate({
            path: 'following.refId'
          })
          .populate({
            path: 'followedBy.refId'
          });
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

      // let locationId;
      // if (input.location) {
      //   const existingLocation = await Location.findOne({
      //     address: input.location.address,
      //     city: input.location.city,
      //     state: input.location.state,
      //     country: input.location.country,
      //     zip: input.location.zip,
      //   });

      //   if (existingLocation) {
      //     locationId = existingLocation._id;
      //   } else {
      //     const newLocation = await Location.create(input.location);
      //     locationId = newLocation._id;
      //   }
      // }

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



      return updatedUser;
    },
    followUser: async (_parent: any, { userId, input }: FollowArgs, context: any) => {
      if (!context.user) {
        return {
          success: false,
          message: 'You must be logged in to follow.',
        }
      }

      const user = await User.findById(userId);
      const { refId, refModel } = input;
      if (!user) {
        return {
          success: false,
          message: 'User not found.',
        }
      }

      // Check if the user is not following the thing to unfollow
      const isFollowing = user.following.some(
        (follow) =>
          follow.refId.toString() === refId &&
          follow.refModel === refModel
      );
      if (isFollowing) {
        return {
          success: false,
          message: `You are already following ${refModel} with ID ${refId}.`,
        };
      }

      if(refModel === 'User') {
        await User.findByIdAndUpdate(refId, {
          $addToSet: {
            followedBy: {
              refId: new mongoose.Types.ObjectId(userId),
              refModel: 'User',
            }
          }
        });
      } else if (refModel === 'Org') {
        await Org.findByIdAndUpdate(refId, {
          $addToSet: {
            followedBy: {
              refId: new mongoose.Types.ObjectId(userId),
              refModel: 'User',
            }}
        });
      } else if (refModel === 'Pet') {
        await Pet.findByIdAndUpdate(refId, {
          $addToSet: {            
            followedBy: {
              refId: new mongoose.Types.ObjectId(userId),
              refModel: 'User',
            }}
        });
      }

      await User.findByIdAndUpdate(
        userId,
        { 
          $addToSet: { 
            following: {
              refId: new mongoose.Types.ObjectId(refId),
              refModel: refModel,               
            } 
          }
        }, 
        { runValidators: true, new: true }
      );

      return {
        success: true,
        message: `You are now following ${refModel} with ID ${refId}.`,
      };
    },
    unFollowUser: async (_parent: any, { userId, input }: FollowArgs, context: any) => {
      if (!context.user) {
        return {
          success: false,
          message: 'You must be logged in to unfollow.',
        }
      }

      const user = await User.findById(userId);
      if (!user) {
        return {
          success: false,
          message: 'User not found.',
        }
      }
      const { refId, refModel } = input;
      // Check if the user is not following the thing to unfollow
      const isFollowing = user.following.some(
        (follow) =>
          follow.refId.toString() === refId &&
          follow.refModel === refModel
      );
      if (!isFollowing) {
        return {
          success: false,
          message: `You are not following ${refModel} with ID ${refId}.`,
        };
      }

      if(refModel === 'User') {
        await User.findByIdAndUpdate(refId, {
          $pull: {
            followedBy: {
              refId: new mongoose.Types.ObjectId(userId),
              refModel: 'User',
            }
          }
        });
      } else if (refModel === 'Org') {
        await Org.findByIdAndUpdate(refId, {
          $pull: {
            followedBy: {
              refId: new mongoose.Types.ObjectId(userId),
              refModel: 'User',
            }
          }
        });
      } else if (refModel === 'Pet') {
        await Pet.findByIdAndUpdate(refId, {
          $pull: {
            followedBy: {
              refId: new mongoose.Types.ObjectId(userId),
              refModel: 'User',
            }
          }
        });
      }

      await User.findByIdAndUpdate(userId, {
        $pull: { 
          following: {
            refId: new mongoose.Types.ObjectId(refId),
            refModel,
          }
      }}); 

      return {
        success: true,
        message: `You have unfollowed ${refModel} with ID ${refId}.`,
      };
    },
  },
};

export default userResolvers;