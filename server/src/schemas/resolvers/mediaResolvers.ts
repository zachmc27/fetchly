import { Media } from '../../models/index.js';
import { GridFSBucket } from 'mongodb';
import mongoose from 'mongoose';
import GraphQLUpload from 'graphql-upload/GraphQLUpload.mjs';

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
    Upload: GraphQLUpload,
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
            console.log('Raw input file:', input.file);

            const upload = input.file as unknown as { promise: Promise<FileUpload> };

            const { createReadStream, filename, mimetype } = await upload.promise;
            console.log('Parsed file:', { filename, mimetype });

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
    },   
    Media: {
        url: (media: any) => {

            return `http://localhost:3001/media/${media.gridFsId}`;
        }
    } 
};

export default mediaResolvers;