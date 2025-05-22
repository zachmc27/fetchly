import adoptionResolvers from './adoptionResolvers.js';
import orgResolvers from './orgResolvers.js';
import petResolvers from './petResolvers.js';
import postResolvers from './postResolvers.js';
import userResolvers from './userResolvers.js';
import typeResolvers from './typeResolvers.js';
import conversationResolvers from './conversationResolvers.js';
import mediaResolvers from './mediaResolvers.js';
import messageResolvers from './messageResolvers.js';
import meetUpResolvers from './meetUpResolvers.js';
import meetUpCommentResolvers from './meetUpCommentResolvers.js';

const resolvers = {

    Query: {
        ...adoptionResolvers.Query,
        ...orgResolvers.Query,
        ...petResolvers.Query,
        ...postResolvers.Query,
        ...userResolvers.Query,
        ...typeResolvers.Query,
        ...conversationResolvers.Query,
        ...messageResolvers.Query,
        ...meetUpResolvers.Query,
        ...meetUpCommentResolvers.Query,
        ...mediaResolvers.Query,
    },
    Mutation: {
        ...adoptionResolvers.Mutation,
        ...orgResolvers.Mutation, 
        ...petResolvers.Mutation,       
        ...postResolvers.Mutation,
        ...userResolvers.Mutation,
        ...typeResolvers.Mutation,
        ...conversationResolvers.Mutation,
        ...messageResolvers.Mutation,
        ...meetUpResolvers.Mutation,
        ...meetUpCommentResolvers.Mutation,
        ...mediaResolvers.Mutation,
    },

}

export default resolvers;