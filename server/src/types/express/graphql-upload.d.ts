declare module 'graphql-upload' {
  import type { RequestHandler } from 'express';
  export function graphqlUploadExpress(): RequestHandler;
}