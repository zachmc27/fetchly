declare module 'apollo-upload-client' {
  import { ApolloLink } from '@apollo/client';
  interface UploadLinkOptions {
    uri?: string;
    credentials?: string;
    headers?: Record<string, string>;
    fetchOptions?: RequestInit;
    fetch?: typeof fetch;
  }

  export function createUploadLink(options?: UploadLinkOptions): ApolloLink;
}