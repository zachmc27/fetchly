import { Schema, model, type Document, Types } from 'mongoose';

export interface MediaDocument extends Document {
  id: string;
  filename: string;
  contentType: string;
  length: number;
  uploadDate: Date;
  gridFsId: Types.ObjectId; // The ID of the file in GridFS
  tags?: string[];
  url?: string; // Optional URL to access the media
}

const mediaSchema = new Schema<MediaDocument>({
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
  },
  tags: [String],
  url: { 
    type: String, 
    required: false 
  } // URL to access the media, if applicable
});

const Media = model<MediaDocument>('Media', mediaSchema);

export default Media;