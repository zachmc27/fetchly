import { Schema, Document, model, ObjectId } from 'mongoose';
interface IUsers extends Document {
  userName: string;
  firstName: string;
  lastName: string;
  about: string;
  userPets: Object[Pets];
  followers: Object[Users];
  userPosts: Object[Comments];
  userConversations: Object[Conversations];
 }
// Schema to create User model
const usersSchema = new Schema<IUsers>(
  {
	  userName: string;
	  firstName: string;
	  lastName: string;
	  about: string;
	  userPets:[{
		
		type: Schema.type.ObjectId,
		ref: 'pets',
	}]
	;
	  followers: [{
		
		type: Schema.type.ObjectId,
		ref: 'users',
	}];
	  userPosts: [{
				
		type: Schema.type.ObjectId,
		ref: 'comments',
	}];
	  userConversations: [{
		type: Schema.type.ObjectId,
		ref: 'conversations',
	}];

  },
  {
	// Mongoose supports two Schema options to transform Objects after querying MongoDb: toJSON and toObject.
	// Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
	toJSON: {
	  virtuals: true,
	},
	id: True,
  }
);
// Initialize our User model
const Users = model('users', usersSchema);
export default Users