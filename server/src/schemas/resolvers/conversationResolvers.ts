import { Conversation, User } from '../../models/index.js';
import { Types } from 'mongoose';

interface CreateConversationArgs {
    input: {
        conversationName: string;
        conversationUsers: string[]; // Array of user IDs
    };
}

const conversationResolvers = {
    Query: {
        conversations: async () => {
            try {
                return await Conversation.find()
                    .populate({
                        path: 'conversationUsers',
                        select: 'username profilePicture',
                    })
                    .populate('messages')
                    .populate('lastMessage');
            } catch (error) {
                if (error instanceof Error) {
                    throw new Error(`Failed to fetch conversations: ${error.message}`);
                }
                throw new Error('Failed to fetch conversations: An unknown error occurred.');
            }
        },
        conversation: async (_parent: any, { conversationId }: { conversationId: string }) => {
            try {
                return await Conversation.findById(conversationId)
                    .populate({
                        path: 'conversationUsers',
                        select: 'username profilePicture',
                    })
                    .populate('messages')
                    .populate('lastMessage');
            } catch (error) {
                if (error instanceof Error) {
                    throw new Error(`Failed to fetch conversation: ${error.message}`);
                }
                throw new Error('Failed to fetch conversation: An unknown error occurred.');
            }
        },
        conversationByUser: async (_parent: any, { userId }: { userId: string }) => {
            try {
                return await Conversation.find({ conversationUsers: userId })
                    .populate({
                        path: 'conversationUsers',
                        select: 'username profilePicture',
                    })
                    .populate('messages')
                    .populate('lastMessage');
            } catch (error) {
                if (error instanceof Error) {
                    throw new Error(`Failed to fetch conversations for user: ${error.message}`);
                }
                throw new Error('Failed to fetch conversations for user: An unknown error occurred.');
            }
        },
    },
    Mutation: {
        createConversation: async (_parent: any, { input }: CreateConversationArgs) => {
            try {
                const userIds = input.conversationUsers;
                const newConversation = await Conversation.create({
                    conversationName: input.conversationName,
                    conversationUsers: userIds,
                });

                const users = await User.find({ _id: { $in: userIds } });
                for (const user of users) {
                    (user.conversation as Types.ObjectId[]).push(newConversation._id as Types.ObjectId);
                    await user.save();
                }

                return newConversation.populate('conversationUsers');
            } catch (error) {
                if (error instanceof Error) {
                    throw new Error(`Failed to create conversation: ${error.message}`);
                }
                throw new Error('Failed to create conversation: An unknown error occurred.');
            }
        },
        updateConversation: async (_parent: any, { conversationId, conversationName }: { conversationId: string; conversationName: string }) => {
            try {
                const updatedConversation = await Conversation.findByIdAndUpdate(
                    conversationId,
                    { conversationName },
                    { new: true }
                ).populate('conversationUsers');

                if (!updatedConversation) {
                    throw new Error('Conversation not found');
                }

                return updatedConversation;
            } catch (error) {
                if (error instanceof Error) {
                    throw new Error(`Failed to update conversation: ${error.message}`);
                }
                throw new Error('Failed to update conversation: An unknown error occurred.');
            }
        },
        deleteConversation: async (_parent: any, { conversationId }: { conversationId: string }) => {
            try {
                const conversation = await Conversation.findByIdAndDelete(conversationId);
                if (!conversation) {
                    throw new Error('Conversation not found');
                }

                // Remove the conversation from all users
                await User.updateMany(
                    { conversation: conversationId },
                    { $pull: { conversation: conversationId } }
                );

                return true;
            } catch (error) {
                if (error instanceof Error) {
                    throw new Error(`Failed to delete conversation: ${error.message}`);
                }
                throw new Error('Failed to delete conversation: An unknown error occurred.');
            }
        },
    },
};

export default conversationResolvers;