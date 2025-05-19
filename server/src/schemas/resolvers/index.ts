import orgResolvers from './orgResolvers.js';
import petResolvers from './petResolvers.js';
import postResolvers from './postResolvers.js';
import userResolvers from './userResolvers.js';
import typeResolvers from './typeResolvers.js';

const resolvers = {

    Query: {
        ...orgResolvers.Query,
        ...petResolvers.Query,
        ...postResolvers.Query,
        ...userResolvers.Query,
        ...typeResolvers.Query,
    },
    Mutation: {
        ...orgResolvers.Mutation, 
        ...petResolvers.Mutation,       
        ...postResolvers.Mutation,
        ...userResolvers.Mutation,
        ...typeResolvers.Mutation,
    },

}

export default resolvers;