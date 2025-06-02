import { Media } from '../../models/index.js';
import { GridFSBucket } from 'mongodb';
import mongoose from 'mongoose';
import GraphQLUpload from 'graphql-upload/GraphQLUpload.mjs';
import { fileTypeFromBuffer } from 'file-type';
import { PassThrough } from 'stream';

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
        uploadMedia: async (_parent: unknown, { input }: { input: UploadMediaInput }, context: any) => {
            const upload = input.file as unknown as { promise: Promise<FileUpload> };
            const { createReadStream, filename, mimetype } = await upload.promise;

            const stream = createReadStream();
            const chunks: Buffer[] = [];
  
            for await (const chunk of stream) {
                chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
            }

            const buffer = Buffer.concat(chunks);

            const type = await fileTypeFromBuffer(buffer);
            const detectedMime = type?.mime || mimetype;

            const bufferStream = new PassThrough();
            bufferStream.end(buffer);

            const bucket = new GridFSBucket(mongoose.connection.db!, {
                bucketName: 'media',
            });     

            const uploadStream = bucket.openUploadStream(filename, {
                contentType: detectedMime,
            });

            const uploadedFileId = uploadStream.id as mongoose.Types.ObjectId;

            await new Promise<void>((resolve, reject) => {
                bufferStream
                    .pipe(uploadStream)
                    .on('error', reject)
                    .on('finish', () =>  resolve());
            });

            const fileDoc = await mongoose.connection.db!
                .collection('media.files')
                .findOne({ _id: uploadedFileId });

            if (!fileDoc) throw new Error('No metadata found for uploaded file');

            const req = context?.req;
            const host = req?.headers?.host || 'localhost:3001';
            const protocol = req?.headers['x-forwarded-proto'] || 'http';

            const newMedia = await Media.create({
                filename,
                contentType: detectedMime,
                length: fileDoc.length,
                uploadDate: new Date(fileDoc.uploadDate),
                gridFsId: uploadedFileId,
                tags: input.tags || [],
                url: `${protocol}://${host}/media/${uploadedFileId}`,
            });

            console.log('Media uploaded successfully:', newMedia);

            return newMedia;
        },
        deleteMedia: async (_parent: unknown, { mediaId }: { mediaId: string }) => {
            const bucket = new GridFSBucket(mongoose.connection.db!, {
                bucketName: 'media',
            });

            const media = await Media.findById(mediaId);
            if (!media) return {
                success: false,
                message: 'Media not found',
            };

            await Media.deleteOne({ _id: mediaId });
            await bucket.delete(new mongoose.Types.ObjectId(media.gridFsId));

            return {
                success: true,
                message: 'Media deleted successfully',
            };
        }
    },   
    Media: {
        url: (media: any, _args: any, context: any) => {
            console.log('Media.url resolver called');
            console.log('Context.req:', context.req?.headers);
            const req = context.req;
            const host = req?.headers?.host || 'localhost:3001'; 
            const protocol = req?.headers['x-forwarded-proto'] || 'http';           
            
            return `${protocol}://${host}/media/${media.gridFsId}`;
        }
    } 
};

export default mediaResolvers;