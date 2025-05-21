import { mergeTypeDefs } from '@graphql-tools/merge'; // This program helps merge the type definitions and avoids circular dependencies and duplication

import adoptionTypeDefs from './adoptionTypeDefs.js';
import conversationTypeDefs from "./conversationTypeDefs.js";
import orgTypeDefs from "./orgTypeDefs.js";
import meetUpCommentTypeDefs from './meetUpCommentsTypeDefs.js';
import meetUpTypeDefs from './meetUpTypeDefs.js';
import petTypeDefs from "./petTypeDefs.js";
import postTypeDefs from "./postTypeDefs.js";
import userTypeDefs from "./userTypeDefs.js";
import typeTypeDefs from "./typeTypeDefs.js";
import messageTypeDefs from "./messageTypeDefs.js";

const typeDefs = mergeTypeDefs([
    adoptionTypeDefs,
    conversationTypeDefs,
    meetUpTypeDefs,
    meetUpCommentTypeDefs, 
    petTypeDefs,
    postTypeDefs,
    userTypeDefs,
    orgTypeDefs,
    typeTypeDefs,
    messageTypeDefs
]);

export default typeDefs;