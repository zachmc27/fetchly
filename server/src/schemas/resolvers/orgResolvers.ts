import { Org, Location, User } from '../../models/index.js';
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

const orgResolvers = {
  Query: {
  // Org Queries
    orgs: async () => {
      return await Org.find()
        .populate('pets')
        .populate('employees')
        .populate('posts')
        .populate('avatar')
        .populate('location');
    },
    org: async (_parent: any, { orgId }: OrgArgs) => {
      return Org.findById(orgId)
        .populate('pets')
        .populate('employees')
        .populate('posts')
        .populate('avatar')
        .populate('location');
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
  }
};

export default orgResolvers;