import { Conversation, User } from '../../models/index.js';
import { Types } from 'mongoose';


interface ConversationArgs {
    conversationId: string;
    conversationName: string;
    conversationUsers: string[]; // Array of user IDs
    messages: string[]; // Array of message IDs
    lastMessage: string; // ID of the last message
}

interface CreateConversationArgs{
    input: {
        conversationName: string;
        conversationUsers: string[]; // Array of user IDs
    };
}
// Define the resolvers for the Conversation model
const conversationResolvers = {
    Query: {
        conversations: async () => {
            return await Conversation.find()
                .populate('conversationUsers')
                .populate('messages')
                .populate('lastMessage');
        },
        conversation: async (_parent: any, { conversationId }: ConversationArgs) => {
            return await Conversation.findById(conversationId)
                .populate('conversationUsers')
                .populate('messages')
                .populate('lastMessage');
        }
    },
    Mutation: {
        CreateConversationInput: async (_parent: any, { input }: CreateConversationArgs) => {
            const userIds = input.conversationUsers; // Use user IDs directly
            const newConversation = await Conversation.create({
                conversationName: input.conversationName,
                conversationUsers: userIds,
            });

            // Populate the conversation ID into each user's conversation list
            const users = await User.find({ _id: { $in: userIds } });
            for (const user of users) {
                (user.conversation as Types.ObjectId[]).push(newConversation._id as Types.ObjectId);
                await user.save();
            }

            return newConversation.populate('conversationUsers');
        },
    }
};
export default conversationResolvers;