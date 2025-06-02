import { Org, Location, User, Pet } from '../../models/index.js';
import { signToken, AuthenticationError } from '../../utils/auth.js';
import mongoose, { Types } from 'mongoose';

// OrgArgs
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
  orgId: string;
}

interface UserInput {
  userId: string;
}

interface LocationInput {
  address: string;
  city: string;
  state: string;
  country: string;
  zip: string;
}

interface UpdateOrgArgs {
  orgId: string;
  input: {
    orgName: string;
    email: string;
    avatar: string;
    about: string;
    location: LocationInput;
    employees: [UserInput]
  }
}

interface employeeArgs {
  orgId: string;
  userId: string;
}

interface FollowArgs {
  orgId: string;
  input: {
    refId: string;
    refModel: string;
  }
}

const orgResolvers = {
  Query: {
  // Org Queries
    orgs: async () => {
      return await Org.find()
          .populate({
              path: 'pets',
              populate: [
                  { path: 'type' },
                  { path: 'profilePhoto'}
              ]
          })
        .populate('employees')
        .populate('posts')
        .populate('avatar')
        .populate('location')        
        .populate({
          path: 'following.refId'
        })
        .populate({
          path: 'followedBy.refId'
        });
    },
    org: async (_parent: any, { orgId }: OrgArgs) => {
      return Org.findById(orgId)
          .populate({
              path: 'pets',
              populate: [
                  { path: 'type' },
                  { path: 'profilePhoto'}
              ]
          })
        .populate('employees')
        .populate('posts')
        .populate('avatar')
        .populate('location')
        .populate({
          path: 'following.refId'
        })
        .populate({
          path: 'followedBy.refId'
        });
    },
  },

    Mutation: {
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

    updateOrg: async (_parent: any, { orgId, input }: UpdateOrgArgs, context: any) => {
      if (!context.user) {
        throw new AuthenticationError('You must be logged in to update an organization.');
      }

      if (context.user._id.toString() !== orgId) {
        throw new AuthenticationError('You are not authorized to update this organization.');
      }

      let locationId;
      if (input.location) {
        const existingLocation = await Location.findOne({
          address: input.location.address,
          city: input.location.city,
          state: input.location.state,
          country: input.location.country,
          zip: input.location.zip,
        });

        if (existingLocation) {
          locationId = existingLocation._id;
        } else {
          const newLocation = await Location.create(input.location);
          locationId = newLocation._id;
        }
      }

      const updateData: any = {
        ...input,
        avatar: typeof input.avatar === 'string' && input.avatar.trim() ? new mongoose.Types.ObjectId(input.avatar) : undefined, 
        location: locationId ?? undefined,
      };

      const updatedOrg = await Org.findByIdAndUpdate(orgId, updateData, { new: true })
        .populate('avatar')
        .populate('location')
        .lean();

      if (updatedOrg?.avatar?._id) {
        updatedOrg.avatar._id = updatedOrg.avatar._id.toString();
      }
      if (updatedOrg?._id) {
        updatedOrg._id = updatedOrg._id.toString();
      }

      return updatedOrg;
    },
    addEmployee: async (_parent: any, { orgId, userId }: employeeArgs) => {
      const org = await Org.findById(orgId);
      if (!org) {
        return {
          success: false,
          message: 'Organization not found',
        }
      }
      const user = await User.findById(userId) as any;
      if (!user) {
        return {
          success: false,
          message: 'User not found',
        }
      }

      if (org.employees.some(emp => emp.equals(user._id.toString()))) {
        return {
          success: false,
          message: 'User is already an employee of this organization',
        }
      }
      org.employees.push(user._id);
      await org.save();

      await User.findByIdAndUpdate(userId, {
        $addToSet: { organizations: org._id },
      });
      return {
        success: true,
        message: 'User added as an employee',
      };
    },
    removeEmployee: async (_parent: any, { orgId, userId }: employeeArgs) => {
      const org = await Org.findById(orgId);
      if (!org) {
        return {
          success: false,
          message: 'Organization not found',
        }
      }
      const user = await User.findById(userId) as any;
      if (!user) {
        return {
          success: false,
          message: 'User not found',
        }
      }

      if (!org.employees.some(emp => emp.equals(user._id.toString()))) {
        return {
          success: false,
          message: 'User is not an employee of this organization',
        }
      }

      org.employees = org.employees.filter(emp => !emp.equals(user._id.toString())) as Types.ObjectId[];
      await org.save();

      await User.findByIdAndUpdate(userId, {
        $pull: { organizations: org._id },
      });
      return {
        success: true,
        message: 'User removed as an employee',
      };
    },
    followOrg: async (_parent: any, { orgId, input }: FollowArgs, context: any) => {
      if (!context.user) {
        throw new AuthenticationError('You must be logged in to update an organization.');
      }

      const org = await Org.findById(orgId);
      const { refId, refModel } = input;
      if (!org) {
        return {
          success: false,
          message: 'Org not found.',
        }
      }

      // Check if the user is not following the thing to unfollow
      const isFollowing = org.following.some(
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
              refId: new mongoose.Types.ObjectId(orgId),
              refModel: 'Org',
            }
          }
        });
      } else if (refModel === 'Org') {
        await Org.findByIdAndUpdate(refId, {
          $addToSet: {
            followedBy: {
              refId: new mongoose.Types.ObjectId(orgId),
              refModel: 'Org',
            }}
        });
      } else if (refModel === 'Pet') {
        await Pet.findByIdAndUpdate(refId, {
          $addToSet: {            
            followedBy: {
              refId: new mongoose.Types.ObjectId(orgId),
              refModel: 'Org',
            }}
        });
      }

      await Org.findByIdAndUpdate(
        orgId,
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
    unFollowOrg: async (_parent: any, { orgId, input }: FollowArgs, context: any) => {
      if (!context.user) {
        throw new AuthenticationError('You must be logged in to update an organization.');
      }

      const org = await Org.findById(orgId);
      if (!org) {
        return {
          success: false,
          message: 'Org not found.',
        }
      }
      const { refId, refModel } = input;
      // Check if the user is not following the thing to unfollow
      const isFollowing = org.following.some(
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
              refId: new mongoose.Types.ObjectId(orgId),
              refModel: 'Org',
            }
          }
        });
      } else if (refModel === 'Org') {
        await Org.findByIdAndUpdate(refId, {
          $pull: {
            followedBy: {
              refId: new mongoose.Types.ObjectId(orgId),
              refModel: 'Org',
            }
          }
        });
      } else if (refModel === 'Pet') {
        await Pet.findByIdAndUpdate(refId, {
          $pull: {
            followedBy: {
              refId: new mongoose.Types.ObjectId(orgId),
              refModel: 'Org',
            }
          }
        });
      }

      await Org.findByIdAndUpdate(orgId, {
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
  }
};

export default orgResolvers;