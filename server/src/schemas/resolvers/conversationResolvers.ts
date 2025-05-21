import { Conversation, User} from '../../models/index.js';

interface ConversationArgs {
    conversationId: string;
    ConversationName: string;
    input: {
        users: {
            refId: string;
            refModel: string;
        }[];
    messages?: {
        refID: string;
        refModel: string;
    }[];
        lastMessage?: {
            sender: string;
            text: string;
        };

    }
}

interface addConversationUserArgs{
    conversationId: string;
    input:{
        userId: string;
    }
}

interface removeConversationUserArgs{

    conversationId: string;
    input:{
        userId: string;
    }
}


const conversationResolvers = {

Query: {
    conversations: async () => {
        return await Conversation.find()
            .populate('users')
            .populate('messages');
    },
    conversation: async (_parent: any, { conversationId }: ConversationArgs) => {
        return await Conversation.findById(conversationId)
            .populate('users')
            .populate('messages');
    }
},
Mutation:{
    addConversation: async (_parent: any, { input }: ConversationArgs) => {
        const conversation = await Conversation.create({ ...input});

        // add the conversation id for each user

       for(let i = 0; i < input.users.length; i++){
        const { refId } = input.users[i];
        await User.findByIdAndUpdate(refId, {
            $push: { conversation: conversation._id }
        });
         }

        return conversation;
    },
        addConversationUser: async (_parent: any, { conversationId, input }: addConversationUserArgs) => {
        const conversation = await Conversation.findByIdAndUpdate(conversationId, {
                $push: { users: input.userId }
            }, { new: true });

        if (!conversation) {
            throw new Error('Conversation not found');
        }

        const user = await User.findByIdAndUpdate(input.userId, {
            $push: { conversation: conversation._id }
        });
        if (!user) {
            throw new Error('User not found');
        }

        return conversation;
    },

    removeConversationUser: async (_parent: any, { conversationId, input }: removeConversationUserArgs) => {
        const conversation = await Conversation.findByIdAndUpdate(conversationId, {
                $pull: { users: input.userId }
            }, { new: true });

        if (!conversation) {
            throw new Error('Conversation not found');
        }

        const user = await User.findByIdAndUpdate(input.userId, {
            $pull: { conversation: conversation._id }
        });
        if (!user) {
            throw new Error('User not found');
        }

        return conversation;



    },
}};
export default conversationResolvers;