import { MeetUpComment, MeetUp } from '../../models/index.js';

// -------------------- Args Interfaces ------------------------

interface AddMeetUpCommentArgs {
  input: {
    meetUpId: string;
    poster: {
      refId: string;
      refModel: string;
    };
    contentText?: string;
    media?: string[];
  };
}

interface MeetUpCommentResponseArgs {
  meetUpCommentId: string;
  input: {
    poster: {
      refId: string;
      refModel: string;
    };
    contentText?: string;
    media?: string[];
  };
}

interface UpdateMeetUpCommentArgs {
  meetUpCommentId: string;
  input: {
    contentText?: string;
    media?: string[];
  };
}

interface DeleteMeetUpCommentArgs {
  meetUpCommentId: string;
}

interface MeetUpCommentArgs {
  meetUpCommentId: string;
}

// -------------------- Resolvers ------------------------

const meetUpCommentResolvers = {
    // MeetUpComment Queries
  Query: {
    meetUpComments: async () => {
      return await MeetUpComment.find()
        .populate('media');
    },
    meetUpComment: async (_parent: any, { meetUpCommentId }: MeetUpCommentArgs) => {
      const comment = await MeetUpComment.findById(meetUpCommentId)
        .populate('media');
      if (!comment) return null;
      return comment;
    }
  },

    // MeetUpComment Mutations
  Mutation: {
    createMeetUpComment: async (_parent: any, { input }: AddMeetUpCommentArgs) => {

        const newComment = await MeetUpComment.create({ ...input });

        await MeetUp.findByIdAndUpdate(input.meetUpId, {
            $addToSet: { comments: newComment._id }
        });

        return newComment;
    },

    updateMeetUpComment: async (_parent: any, { meetUpCommentId, input }: UpdateMeetUpCommentArgs) => {
      const comment = await MeetUpComment.findByIdAndUpdate(
        meetUpCommentId, input,
        { new: true, runValidators: true }
      );
      if (!comment) return null;
      return comment;
    },

    deleteMeetUpComment: async (_parent: any, { meetUpCommentId }: DeleteMeetUpCommentArgs) => {
      const comment = await MeetUpComment.findById(meetUpCommentId);
      if (!comment) return false;

      const deleted = await MeetUpComment.findByIdAndDelete(meetUpCommentId);

      if (deleted && comment.meetUpId) {
        await MeetUp.findByIdAndUpdate(comment.meetUpId, {
          $pull: { comments: deleted._id }
        });
      }

      return deleted;
    },

    createMeetUpCommentResponse: async (_parent: any, { meetUpCommentId, input }: MeetUpCommentResponseArgs) => {
      const parentComment = await MeetUpComment.findById(meetUpCommentId);
      if (!parentComment) return null;

      const response = await MeetUpComment.create({
        ...input,
        parentComment: meetUpCommentId
      });

      await MeetUpComment.findByIdAndUpdate(
        meetUpCommentId,
        { $push: { responses: response._id } }
      );

      return response;
    }
  }
};

export default meetUpCommentResolvers;