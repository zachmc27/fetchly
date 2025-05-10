import { Schema, model, type Document, Types } from 'mongoose';

export interface AvatarDocument extends Document {
  id: string;
  filename: string;
  contentType: string;
  length: number;
  uploadDate: Date;
  gridFsId: Types.ObjectId; // The ID of the file in GridFS
}

const avatarSchema = new Schema<AvatarDocument>({
  filename: { 
    type: String, 
    required: true 
  },
  contentType: { 
    type: String, 
    required: true 
  }, // e.g., 'image/jpeg', 'video/mp4'
  length: { 
    type: Number 
  }, // File size in bytes
  uploadDate: { 
    type: Date 
  },
  gridFsId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'fs.files'
  }
});

const Avatar = model<AvatarDocument>('Media', avatarSchema);
export default Avatar;