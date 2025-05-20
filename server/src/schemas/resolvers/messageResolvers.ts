import { Media,Message, Conversation } from '../../models/index.js';


// MessageArgs

interface Media {
    refId: string;
    refModel: string;
}



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
                .populate('sender')
                .populate('conversation')
                .populate('readUser');
        },
        message: async (_parent: any, { messageId }: MessageArgs) => {
            return Message.findById(messageId)
                .populate('sender')
                .populate('conversation')
                .populate('readUser');
        }
    },
    Mutation: {
        // Message Mutations
        addMessage: async (_parent: any, { input }: MessageArgs) => {
            const message = await Message.create({ ...input });


            const { refId: conversationRefId, refModel: conversationRefModel } = input.conversation;

            if (conversationRefModel === 'Conversation') {
                await Conversation.findByIdAndUpdate(conversationRefId, {
                    $push: { messages: message._id }
                });
            }
            return message;
        },
        updateMessage: async (_parent: any, { input }: UpdateMessageInputArgs) => {
            return await Message.findByIdAndUpdate(input.messageId, input, { new: true });
        },
        deleteMessage: async (_parent: any, { input }: DeleteMessageInputArgs) => {
            return await Message.findByIdAndDelete(input.messageId);
        },
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