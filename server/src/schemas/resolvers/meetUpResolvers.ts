import { MeetUp, User, Location } from '../../models/index.js';
import { Types } from 'mongoose';

// MeetUpArgs
interface LocationArgs {
  address: string;
  city: string;
  state: string;
  country: string;
  zip: string;
}

interface AddMeetUpArgs {
    input: {
        title: string;
        poster: {
            refId: string;
            refModel: string;
        };
        description?: string;
        location?: LocationArgs;
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
        location?: LocationArgs;
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

interface attendArgs {
    meetUpId: string;
    userId: string;
}

const meetUpResolvers = {
    // MeetUp Queries
    Query: {
        meetUps: async () => {
            return await MeetUp.find()
                .populate('media')
                .populate({
                    path: 'comments',
                        populate: {
                        path: 'poster.refId',
                }})
                .populate('location')
                .populate('poster.refId');
        },
        meetUp: async (_parent: any, { meetUpId }: MeetUpArgs) => {
            return await MeetUp.findById(meetUpId)
                .populate('media')
                .populate({
                    path: 'comments',
                        populate: {
                        path: 'poster.refId',
                }})
                .populate('location')
                .populate('poster.refId');
        },
    },

    // MeetUp Mutations

    Mutation: {
        addMeetUp: async (_parent: any, { input }: AddMeetUpArgs) => {
            let locationId;
            if (input.location) {
                const existingLocation = await Location.findOne({
                    address: input.location.address,
                    city: input.location.city,
                    state: input.location.state,
                    country: input.location.country,
                    zip: input.location.zip,
                });
                if (existingLocation) {
                    locationId = existingLocation._id;
                } else {
                    const newLocation = await Location.create(input.location);
                    locationId = newLocation._id;
                }
            }
            
            const { location, ...rest } = input;
            
            const newMeetUp = await MeetUp.create({ 
                ...rest,
                location: locationId,
            });

            return newMeetUp;
        },
        updateMeetUp: async (_parent: any, { meetUpId, input }: UpdateMeetUpArgs) => {
            let locationId;
            if (input.location) {
                const existingLocation = await Location.findOne({
                    address: input.location.address,
                    city: input.location.city,
                    state: input.location.state,
                    country: input.location.country,
                    zip: input.location.zip,
                });

                if (existingLocation) {
                    locationId = existingLocation._id;
                } else {
                    const newLocation = await Location.create(input.location);
                    locationId = newLocation._id;
                }
            }            

            const updateData: any = {
                ...input,
                location: locationId ?? undefined,
            };       
            
            const meetUp = await MeetUp.findByIdAndUpdate(meetUpId, updateData, { new: true })
                .populate('location');            

            return meetUp;
        },
        deleteMeetUp: async (_parent: any, { meetUpId }: DeleteMeetUpArgs) => {
            return await MeetUp.findByIdAndDelete(meetUpId);
        },
        attendMeetUp: async (_parent: any, { meetUpId, userId }: attendArgs) => {
            const meetUp = await MeetUp.findById(meetUpId);
            if (!meetUp) {
                return {
                    success: false,
                    message: 'MeetUp not found',
                }
            }
            const user = await User.findById(userId) as any;
            if (!user) {
                return {
                    success: false,
                    message: 'User not found',
                }
            }            
            if (meetUp.attendees.includes(user._id.toString())) {
                return {
                    success: false,
                    message: 'User already attending this MeetUp',
                }
            }
            await User.findByIdAndUpdate(userId, {
                $addToSet: { meetUps: meetUpId },
            });
            meetUp.attendees.push(user._id);
            await meetUp.save();
            return {
                success: true,
                message: 'User added to MeetUp attendees',
            };
        },
        unAttendMeetUp: async (_parent: any, { meetUpId, userId }: attendArgs) => {
            const meetUp = await MeetUp.findById(meetUpId);
            if (!meetUp) {
                return {
                    success: false,
                    message: 'MeetUp not found',
                }
            }
            const user = await User.findById(userId) as any;
            if (!user) {
                return {
                    success: false,
                    message: 'User not found',
                }
            }
            if (!meetUp.attendees.some((id) => id.equals(user._id.toString()))) {
                return {
                    success: false,
                    message: 'User not attending this MeetUp',
                }
            }
            await User.findByIdAndUpdate(userId, {
                $pull: { meetUps: meetUpId },
            });
            meetUp.attendees = meetUp.attendees.filter((id) => !id.equals(user._id.toString())) as Types.ObjectId[];
            await meetUp.save();

            return {
                success: true,
                message: 'User removed from MeetUp attendees',
            };
        },
    },
};

export default meetUpResolvers;
