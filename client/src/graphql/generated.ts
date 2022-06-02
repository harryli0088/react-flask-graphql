import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /**
   * Create scalar that ignores normal serialization/deserialization, since
   * that will be handled by the multipart request spec
   */
  Upload: any;
};

export type Books = Node & {
  __typename?: 'Books';
  author?: Maybe<Scalars['String']>;
  genre?: Maybe<Genres>;
  genreId?: Maybe<Scalars['Int']>;
  /** The ID of the object. */
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
};

export type BooksConnection = {
  __typename?: 'BooksConnection';
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<BooksEdge>>;
  /** Pagination data for this connection. */
  pageInfo: PageInfo;
};

/** A Relay edge containing a `Books` and its cursor. */
export type BooksEdge = {
  __typename?: 'BooksEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node?: Maybe<Books>;
};

export type Characters = Node & {
  __typename?: 'Characters';
  book?: Maybe<Books>;
  bookId?: Maybe<Scalars['Int']>;
  /** The ID of the object. */
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
};

export type CreateBook = {
  __typename?: 'CreateBook';
  book?: Maybe<Books>;
  ok?: Maybe<Scalars['Boolean']>;
};

export type CreateBookInput = {
  author?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type Files = {
  __typename?: 'Files';
  lastModified?: Maybe<Scalars['Float']>;
  name?: Maybe<Scalars['String']>;
};

export type Genres = Node & {
  __typename?: 'Genres';
  books?: Maybe<BooksConnection>;
  /** The ID of the object. */
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
};


export type GenresBooksArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createBook?: Maybe<CreateBook>;
  uploadFile?: Maybe<UploadMutation>;
};


export type MutationCreateBookArgs = {
  input: CreateBookInput;
};


export type MutationUploadFileArgs = {
  file: Scalars['Upload'];
};

/** An object with an ID */
export type Node = {
  /** The ID of the object. */
  id: Scalars['ID'];
};

/** The Relay compliant `PageInfo` type, containing data necessary to paginate this connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  booksByGenre?: Maybe<Array<Maybe<Books>>>;
  booksByName?: Maybe<Array<Maybe<Books>>>;
  files?: Maybe<Array<Maybe<Files>>>;
  goodbye?: Maybe<Scalars['String']>;
  hello?: Maybe<Scalars['String']>;
  /** The ID of the object */
  node?: Maybe<Node>;
};


export type QueryBooksByGenreArgs = {
  name?: InputMaybe<Scalars['String']>;
};


export type QueryBooksByNameArgs = {
  name?: InputMaybe<Scalars['String']>;
};


export type QueryHelloArgs = {
  name?: InputMaybe<Scalars['String']>;
};


export type QueryNodeArgs = {
  id: Scalars['ID'];
};

export type UploadMutation = {
  __typename?: 'UploadMutation';
  success?: Maybe<Scalars['Boolean']>;
};

export type UploadFileMutationVariables = Exact<{
  file: Scalars['Upload'];
}>;


export type UploadFileMutation = { __typename?: 'Mutation', uploadFile?: { __typename?: 'UploadMutation', success?: boolean | null } | null };

export type FilesQueryVariables = Exact<{ [key: string]: never; }>;


export type FilesQuery = { __typename?: 'Query', files?: Array<{ __typename?: 'Files', name?: string | null, lastModified?: number | null } | null> | null };


export const UploadFileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UploadFile"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"file"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Upload"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uploadFile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"file"},"value":{"kind":"Variable","name":{"kind":"Name","value":"file"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<UploadFileMutation, UploadFileMutationVariables>;
export const FilesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"files"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"files"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"lastModified"}}]}}]}}]} as unknown as DocumentNode<FilesQuery, FilesQueryVariables>;