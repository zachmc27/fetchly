import { MeetUp } from '../../models/index.js';

// MeetUpArgs
interface AddMeetUpArgs {
    input: {
        title: string;
        poster: {
            refId: string;
            refModel: string;
        };
        description?: string;
        location?: string;
        date?: string;
        time?: string;
        attendees?: string[];
        media?: string[];
    }
}   

interface UpdateMeetUpArgs {
    meetUpId: string;
    input: {
        title?: string;
        poster?: {
            refId: string;
            refModel: string;
        };
        description?: string;
        location?: string;
        date?: string;
        time?: string;
        attendees?: string[];
        media?: string[];
    }
}

interface DeleteMeetUpArgs {
    meetUpId: string;
}

interface MeetUpArgs {
    meetUpId: string;
    poster: {
        refId: string;
        refModel: string;
    };
}

const meetUpResolvers = {
    // MeetUp Queries
    Query: {
        meetUps: async () => {
            return await MeetUp.find()
                .populate('media')
                .populate('comments');
        },
        meetUp: async (_parent: any, { meetUpId }: MeetUpArgs) => {
            return await MeetUp.findById(meetUpId)
                .populate('media')
                .populate('comments');
        },
    },

    // MeetUp Mutations

    Mutation: {
        addMeetUp: async (_parent: any, { input }: AddMeetUpArgs) => {
            const newMeetUp = new MeetUp(input);
            return await newMeetUp.save();
        },
        updateMeetUp: async (_parent: any, { meetUpId, input }: UpdateMeetUpArgs) => {
            return await MeetUp.findByIdAndUpdate(meetUpId, input, { new: true });
        },
        deleteMeetUp: async (_parent: any, { meetUpId }: DeleteMeetUpArgs) => {
            return await MeetUp.findByIdAndDelete(meetUpId);
        },
    },
};

export default meetUpResolvers;
