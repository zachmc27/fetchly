import { Org } from '../../models/index.js';
import { signToken, AuthenticationError } from '../../utils/auth.js'; 

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

const orgResolvers = {
  Query: {
// Org Queries
    orgs: async () => {
      return await Org.find().populate('pet');
    },
    org: async (_parent: any, { orgName }: OrgArgs) => {
      return Org.findOne({ orgName }).populate('pet');
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
}
};

export default orgResolvers;