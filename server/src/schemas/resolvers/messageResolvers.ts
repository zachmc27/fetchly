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
        conversation: {
            refId: string;
            refModel: string;
        };
        text: string;
        media: Media[];
    }
}
interface AddMessageInputArgs {
    conversationId: string;
    input: {
        messageUser: {
            refId: string;
            refModel: string;
        };
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
                .populate('messageUsER')
                .populate('conversation')
                .populate('readUser');
        },
        message: async (_parent: any, { messageId }: MessageArgs) => {
            return Message.findById(messageId)
                .populate('messageUser')
                .populate('conversation')
                .populate('readUser');
        }
    },
    Mutation: {
        addMessage: async (_parent: any, { conversationId, input }: AddMessageInputArgs) => {
            const newMessage = await Message.create({
                messageUser: input.messageUser,
                textContent: input.textContent,
                media: input.media,
                readUser: [],
            });
            await Conversation.findByIdAndUpdate(conversationId, {
                $push: { messages: newMessage._id },
                $set: { lastMessage: newMessage._id },
            });
            return newMessage;
        },
        updateMessage: async (_parent: any, { input }: UpdateMessageInputArgs) => {
            const updatedMessage = await Message.findByIdAndUpdate(input.messageId, {
                messageUser: input.messageUser,
                textContent: input.textContent,
                media: input.media,
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