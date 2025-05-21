import { Media } from '../../models/index.js';
import { GridFSBucket } from 'mongodb';
import mongoose from 'mongoose';

// MediaArgs
interface UploadMediaInput {
    file: Promise<FileUpload>;
    tags?: string[];
}

interface FileUpload {
    filename: string;
    mimetype: string;
    encoding: string;
    createReadStream: () => NodeJS.ReadableStream;
}

const mediaResolvers = {
    Query: {
        media: async (_parent: unknown, { id }: { id: string }) => {
            const media = await Media.findById(id);
            if (!media) throw new Error('Media not found');
            return media;
        },
        allMedia: async () => {
            const media = await Media.find();
            return media;
        }
    },

    Mutation: {
        uploadMedia: async (_parent: unknown, { input }: { input: UploadMediaInput }) => {
            const { createReadStream, filename, mimetype } = await input.file;

            const bucket = new GridFSBucket(mongoose.connection.db!, {
                bucketName: 'media',
            });     

            const gridFsStream = createReadStream();
            const uploadStream = bucket.openUploadStream(filename, {
                contentType: mimetype,
            });

            const uploadedFileId = uploadStream.id as mongoose.Types.ObjectId;

            await new Promise<void>((resolve, reject) => {
                gridFsStream
                    .pipe(uploadStream)
                    .on('error', reject)
                    .on('finish', () =>  resolve());
            });

            const fileDoc = await mongoose.connection.db!
                .collection('media.files')
                .findOne({ _id: uploadedFileId });

            if (!fileDoc) throw new Error('No metadata found for uploaded file');

            const newMedia = await Media.create({
                filename,
                contentType: mimetype,
                length: fileDoc.length,
                uploadDate: fileDoc.uploadDate,
                gridFsId: uploadedFileId,
                tags: input.tags || [],
            });

            return newMedia;
        }
    }    
};

export default mediaResolvers;