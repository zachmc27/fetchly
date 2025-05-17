import { Org } from '../../models/index.js';
import { signToken, AuthenticationError } from '../../utils/auth.js'; 

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

interface UpdateOrgArgs {
  orgId: string;
  input: {
    orgName: string;
    email: string;
    avatar: string;
    about: string;
    location: string;
    employees: [UserInput]
  }
}

const orgResolvers = {
  Query: {
  // Org Queries
    orgs: async () => {
      return await Org.find()
        .populate('pets')
        .populate('employees')
        .populate('posts');
    },
    org: async (_parent: any, { orgId }: OrgArgs) => {
      return Org.findById(orgId)
        .populate('pets')
        .populate('employees')
        .populate('posts');
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

      const updatedOrg = await Org.findByIdAndUpdate(orgId, { ...input }, { new: true });

      return updatedOrg;
    },
}
};

export default orgResolvers;