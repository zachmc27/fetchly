import orgResolvers from './orgResolvers.js';
import petResolvers from './petResolvers.js';
import postResolvers from './postResolvers.js';
import userResolvers from './userResolvers.js';

const resolvers = {

    Query: {
        ...orgResolvers.Query,
        ...petResolvers.Query,
        ...postResolvers.Query,
        ...userResolvers.Query,

    },
    Mutation: {
        ...orgResolvers.Mutation, 
        ...petResolvers.Mutation,       
        ...postResolvers.Mutation,
        ...userResolvers.Mutation,
    },

}

export default resolvers;