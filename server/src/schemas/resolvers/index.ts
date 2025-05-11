import orgResolvers from './orgResolvers.js';
import postResolvers from './postResolvers.js';
import userResolvers from './userResolvers.js';

const resolvers = {

    Query: {
        ...orgResolvers.Query,
        ...postResolvers.Query,
        ...userResolvers.Query,

    },
    Mutation: {
        ...orgResolvers.Mutation,        
        ...postResolvers.Mutation,
        ...userResolvers.Mutation,
    },

}

export default resolvers;