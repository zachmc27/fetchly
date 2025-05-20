import { mergeTypeDefs } from '@graphql-tools/merge'; // This program helps merge the type definitions and avoids circular dependencies and duplication

import conversationTypeDefs from "./conversationTypeDefs.js";
import orgTypeDefs from "./orgTypeDefs.js";
import petTypeDefs from "./petTypeDefs.js";
import postTypeDefs from "./postTypeDefs.js";
import userTypeDefs from "./userTypeDefs.js";
import typeTypeDefs from "./typeTypeDefs.js";
import messageTypeDefs from "./messageTypeDefs.js";

const typeDefs = mergeTypeDefs([
    conversationTypeDefs,
    petTypeDefs,
    postTypeDefs,
    userTypeDefs,
    orgTypeDefs,
    typeTypeDefs,
    messageTypeDefs
]);

export default typeDefs;