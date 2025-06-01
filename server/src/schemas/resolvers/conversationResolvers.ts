import { Conversation, User } from '../../models/index.js';
import { Types, isValidObjectId } from 'mongoose';

interface CreateConversationArgs {
    input: {
        conversationName: string;
        conversationUsers: string[];
    };
}
interface UpdateConversationNameArgs {
    input: {
        _id: string;
        conversationName: string;
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
                .populate({
                    path: 'messages',
                    populate: {
                        path: 'messageUser',
                        select: 'username profilePicture', // Ensure these fields exist in the User schema
                    },
                })
                .populate({
                    path: 'lastMessages',
                    populate: {
                        path: 'unreadUser',
                        select: 'username ', // Ensure these fields exist in the User schema
                    },
                });
            } catch (error) {
                if (error instanceof Error) {
                    throw new Error(`Failed to fetch conversations: ${error.message}`);
                }
                throw new Error('Failed to fetch conversations: An unknown error occurred.');
            }
        },
        conversation: async (_parent: any, { conversationId }: { conversationId: string }) => {
            try {
                if (!isValidObjectId(conversationId)) {
                    throw new Error('Invalid conversationId format');
                }

                return await Conversation.findById(conversationId)
                    .populate({
                        path: 'conversationUsers',
                        select: 'username profilePicture',
                    })
                    .populate({
                        path: 'messages',
                        populate: {
                            path: 'messageUser',
                            select: 'username profilePicture', // Ensure these fields exist in the User schema
                        },
                    })
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
                if (!isValidObjectId(userId)) {
                    throw new Error('Invalid userId format');
                }

                return await Conversation.find({ conversationUsers: userId })
                    .populate({
                        path: 'conversationUsers',
                        select: 'username profilePicture', // Ensure these fields exist in the User schema
                    })
                    .populate({
                        path: 'messages',
                        populate: {
                            path: 'messageUser',
                            select: 'username profilePicture', // Ensure these fields exist in the User schema
                        }
                    })
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

                if (!userIds || userIds.length === 0) {
                    throw new Error('No users provided for the conversation');
                }

                const newConversation = await Conversation.create({
                    conversationName: input.conversationName,
                    conversationUsers: userIds,
                });

                const users = await User.find({ _id: { $in: userIds } });
                if (users.length !== userIds.length) {
                    throw new Error('Some users provided for the conversation do not exist');
                }

                for (const user of users) {
                    if (!user.conversation) {
                        user.conversation = [];
                    }
                    (user.conversation as Types.ObjectId[]).push(newConversation._id as Types.ObjectId);
                    await user.save();
                }

                return await newConversation.populate({
                    path: 'conversationUsers',
                    select: 'username profilePicture',
                });
            } catch (error) {
                if (error instanceof Error) {
                    throw new Error(`Failed to create conversation: ${error.message}`);
                }
                throw new Error('Failed to create conversation: An unknown error occurred.');
            }
        },
        updateConversationName: async (_parent: any, { input }: UpdateConversationNameArgs) => {
            try{
                if (!isValidObjectId(input._id)) {
                    throw new Error('Invalid conversationId format');
                }

                const conversation = await Conversation.findByIdAndUpdate(
                    input._id,
                    { conversationName: input.conversationName },
                    { new: true }
                ).populate({
                    path: 'conversationUsers',
                    select: 'username profilePicture',
                });

                if (!conversation) {
                    throw new Error('Conversation not found');
                }

                return conversation;
            } catch (error) {
                if (error instanceof Error) {
                    throw new Error(`Failed to update conversation name: ${error.message}`);
                }
                throw new Error('Failed to update conversation name: An unknown error occurred.');
            }
        },

        deleteConversation: async (_parent: any, { conversationId }: { conversationId: string }) => {
            try {
                if (!isValidObjectId(conversationId)) {
                    throw new Error('Invalid conversationId format');
                }

                const conversation = await Conversation.findByIdAndDelete(conversationId);
                if (!conversation) {
                    throw new Error('Conversation not found');
                }

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