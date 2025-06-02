import { Type } from '../../models/index.js';

// TypeArgs

interface TypeArgs {
  typeId: string;
  type: string;
  breed: string;
}

interface AddTypeArgs {
  input: {
    type: string;
    breed: string;
  };
}

interface UpdateTypeArgs {
  typeId: string;
  input: {
    type: string;
    breed: string;
  };
}

interface DeleteTypeArgs {
  typeId: string;
}

const typeResolvers = {
  Query: {
    // Type Queries
    types: async (_parent: any, args: { type?: string }) => {
      if (args.type) {
        return await Type.find({ type: args.type });
      }
      return await Type.find();
    },
    type: async (_parent: any, { typeId }: TypeArgs) => {
      return await Type.findById(typeId);
    },
  },
  Mutation: {
    // Type Mutations
    addType: async (_parent: any, { input }: AddTypeArgs) => {
      return await Type.create({ ...input });
    },
    updateType: async (_parent: any, { typeId, input }: UpdateTypeArgs) => {
      return await Type.findByIdAndUpdate(typeId, input, { new: true });
    },
    deleteType: async (_parent: any, { typeId }: DeleteTypeArgs) => {
      return await Type.findByIdAndDelete(typeId);
    },
  },
};

export default typeResolvers;