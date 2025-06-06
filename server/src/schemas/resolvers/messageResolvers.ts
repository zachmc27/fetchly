import {Message, Conversation, Media } from '../../models/index.js';

interface Media{
    refId: string;
    refModel: string;
}

// MessageArgs
interface MessageArgs {
    messageId: string;
    input: {
        messageId: string;
        sender: {
            refId: string;
            refModel: string;
        };
        conversation: string;
        text: string;
        media: Media[];
        createdAt: Date;
        formattedCreatedAt: string;
    }
}
interface AddMessageInputArgs {
    input: {
        messageUser: {
            refId: string;
            refModel: string;
        };
        conversation: string;
        textContent: string;
        media: Media[];
    }
}
interface UpdateMessageInputArgs{
    input:{
    messageId: string;
    messageUser: {
        refId: string;
        refModel: string;
    };
    textContent: string;
    media: Media[];
    readUser: [];
    }
}

interface DeleteMessageInputArgs{
    input: {
    messageId: string;
    }
    };


const messageResolvers = {
    Query: {
        // Message Queries
        messages: async () => {
            return await Message.find()
                .populate({
                    path: 'messageUser',
                    select: 'username _id', // Explicitly select the fields you need
                })
                .populate('conversation')
                .populate('readUser');
        },
        message: async (_parent: any, { messageId }: MessageArgs) => {
            return Message.findById(messageId)
                .populate({
                    path: 'messageUser',
                    select: 'username _id', // Explicitly select the fields you need
                })
                .populate('conversation')
                .populate('readUser');
        },
        messageByConversation: async (_parent: any, { conversationId }: { conversationId: string }) => {
            const messages = await Message.find({ conversation: conversationId })
                .populate({
                    path: 'messageUser',
                    select: 'username _id', // Explicitly select the fields you need
                })
                .populate('conversation')
                .populate('readUser');
        
            return messages.map((message) => ({
                ...message.toObject(),
                messageUser: message.messageUser || null, // Return null if messageUser is missing
            }));
        },
    },
    Mutation: {
        addMessage: async (_parent: any, { input }: AddMessageInputArgs) => {
            const newMessage = await Message.create({
                messageUser: input.messageUser,
                textContent: input.textContent,
                conversation: input.conversation,
                media: input.media,
                readUser: [],
            });
            await Conversation.findByIdAndUpdate(input.conversation, {
                $push: { messages: newMessage._id },
                $set: { lastMessage: newMessage._id },
            });
            return newMessage;
        },
        updateMessage: async (_parent: any, { input }: UpdateMessageInputArgs) => {
            const updatedMessage = await Message.findByIdAndUpdate(input.messageId, {
                messageUser: input.messageUser,
                textContent: input.textContent,               media: input.media,
                readUser: input.readUser,
            }, { new: true });
            return updatedMessage;
        },
        deleteMessage: async (_parent: any, { input }: DeleteMessageInputArgs) => {
            const deletedMessage = await Message.findByIdAndDelete(input.messageId);
            return deletedMessage;
        }
       },

    Subscription: {
        messageAdded: {
            subscribe: (_parent: any, _args: any, { pubsub }: any) => {
                return pubsub.asyncIterator('MESSAGE_ADDED');
            },
        },
    },
};

export default messageResolvers;