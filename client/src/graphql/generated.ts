import { useMutation, useQuery, UseMutationOptions, UseQueryOptions } from 'react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

function fetcher<TData, TVariables>(query: string, variables?: TVariables) {
  return async (): Promise<TData> => {
    const res = await fetch("http://localhost:8000/graphql", {
    method: "POST",
    ...({"headers":{"Content-Type":"application/json"}}),
      body: JSON.stringify({ query, variables }),
    });

    const json = await res.json();

    if (json.errors) {
      const { message } = json.errors[0];

      throw new Error(message);
    }

    return json.data;
  }
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Books = Node & {
  __typename?: 'Books';
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

export type CreateBook = {
  __typename?: 'CreateBook';
  book?: Maybe<Books>;
  ok?: Maybe<Scalars['Boolean']>;
};

export type CreateBookInput = {
  genreId?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type CreateGenre = {
  __typename?: 'CreateGenre';
  genre?: Maybe<Genres>;
  ok?: Maybe<Scalars['Boolean']>;
};

export type CreateGenreInput = {
  name?: InputMaybe<Scalars['String']>;
};

export type DeleteBook = {
  __typename?: 'DeleteBook';
  ok?: Maybe<Scalars['Boolean']>;
};

export type DeleteBookInput = {
  id?: InputMaybe<Scalars['String']>;
};

export type DeleteFile = {
  __typename?: 'DeleteFile';
  success?: Maybe<Scalars['Boolean']>;
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
  createGenre?: Maybe<CreateGenre>;
  deleteBook?: Maybe<DeleteBook>;
  deleteFile?: Maybe<DeleteFile>;
};


export type MutationCreateBookArgs = {
  input: CreateBookInput;
};


export type MutationCreateGenreArgs = {
  input: CreateGenreInput;
};


export type MutationDeleteBookArgs = {
  input: DeleteBookInput;
};


export type MutationDeleteFileArgs = {
  name?: InputMaybe<Scalars['String']>;
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
  books?: Maybe<Array<Maybe<Books>>>;
  booksByGenre?: Maybe<Array<Maybe<Books>>>;
  booksByName?: Maybe<Array<Maybe<Books>>>;
  files?: Maybe<Array<Maybe<Files>>>;
  genres?: Maybe<Array<Maybe<Genres>>>;
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

export type CreateBookMutationVariables = Exact<{
  genreId: Scalars['String'];
  name: Scalars['String'];
}>;


export type CreateBookMutation = { __typename?: 'Mutation', createBook?: { __typename?: 'CreateBook', ok?: boolean | null } | null };

export type DeleteBookMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteBookMutation = { __typename?: 'Mutation', deleteBook?: { __typename?: 'DeleteBook', ok?: boolean | null } | null };

export type CreateGenreMutationVariables = Exact<{
  name: Scalars['String'];
}>;


export type CreateGenreMutation = { __typename?: 'Mutation', createGenre?: { __typename?: 'CreateGenre', ok?: boolean | null } | null };

export type DeleteFileMutationVariables = Exact<{
  name: Scalars['String'];
}>;


export type DeleteFileMutation = { __typename?: 'Mutation', deleteFile?: { __typename?: 'DeleteFile', success?: boolean | null } | null };

export type BooksQueryVariables = Exact<{ [key: string]: never; }>;


export type BooksQuery = { __typename?: 'Query', books?: Array<{ __typename?: 'Books', id: string, name?: string | null, genre?: { __typename?: 'Genres', id: string, name?: string | null } | null } | null> | null };

export type FilesQueryVariables = Exact<{ [key: string]: never; }>;


export type FilesQuery = { __typename?: 'Query', files?: Array<{ __typename?: 'Files', lastModified?: number | null, name?: string | null } | null> | null };

export type GenresQueryVariables = Exact<{ [key: string]: never; }>;


export type GenresQuery = { __typename?: 'Query', genres?: Array<{ __typename?: 'Genres', id: string, name?: string | null } | null> | null };


export const CreateBookDocument = `
    mutation CreateBook($genreId: String!, $name: String!) {
  createBook(input: {genreId: $genreId, name: $name}) {
    ok
  }
}
    `;
export const useCreateBookMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CreateBookMutation, TError, CreateBookMutationVariables, TContext>) =>
    useMutation<CreateBookMutation, TError, CreateBookMutationVariables, TContext>(
      ['CreateBook'],
      (variables?: CreateBookMutationVariables) => fetcher<CreateBookMutation, CreateBookMutationVariables>(CreateBookDocument, variables)(),
      options
    );
export const DeleteBookDocument = `
    mutation DeleteBook($id: String!) {
  deleteBook(input: {id: $id}) {
    ok
  }
}
    `;
export const useDeleteBookMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<DeleteBookMutation, TError, DeleteBookMutationVariables, TContext>) =>
    useMutation<DeleteBookMutation, TError, DeleteBookMutationVariables, TContext>(
      ['DeleteBook'],
      (variables?: DeleteBookMutationVariables) => fetcher<DeleteBookMutation, DeleteBookMutationVariables>(DeleteBookDocument, variables)(),
      options
    );
export const CreateGenreDocument = `
    mutation CreateGenre($name: String!) {
  createGenre(input: {name: $name}) {
    ok
  }
}
    `;
export const useCreateGenreMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CreateGenreMutation, TError, CreateGenreMutationVariables, TContext>) =>
    useMutation<CreateGenreMutation, TError, CreateGenreMutationVariables, TContext>(
      ['CreateGenre'],
      (variables?: CreateGenreMutationVariables) => fetcher<CreateGenreMutation, CreateGenreMutationVariables>(CreateGenreDocument, variables)(),
      options
    );
export const DeleteFileDocument = `
    mutation deleteFile($name: String!) {
  deleteFile(name: $name) {
    success
  }
}
    `;
export const useDeleteFileMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<DeleteFileMutation, TError, DeleteFileMutationVariables, TContext>) =>
    useMutation<DeleteFileMutation, TError, DeleteFileMutationVariables, TContext>(
      ['deleteFile'],
      (variables?: DeleteFileMutationVariables) => fetcher<DeleteFileMutation, DeleteFileMutationVariables>(DeleteFileDocument, variables)(),
      options
    );
export const BooksDocument = `
    query books {
  books {
    genre {
      id
      name
    }
    id
    name
  }
}
    `;
export const useBooksQuery = <
      TData = BooksQuery,
      TError = unknown
    >(
      variables?: BooksQueryVariables,
      options?: UseQueryOptions<BooksQuery, TError, TData>
    ) =>
    useQuery<BooksQuery, TError, TData>(
      variables === undefined ? ['books'] : ['books', variables],
      fetcher<BooksQuery, BooksQueryVariables>(BooksDocument, variables),
      options
    );
export const FilesDocument = `
    query files {
  files {
    lastModified
    name
  }
}
    `;
export const useFilesQuery = <
      TData = FilesQuery,
      TError = unknown
    >(
      variables?: FilesQueryVariables,
      options?: UseQueryOptions<FilesQuery, TError, TData>
    ) =>
    useQuery<FilesQuery, TError, TData>(
      variables === undefined ? ['files'] : ['files', variables],
      fetcher<FilesQuery, FilesQueryVariables>(FilesDocument, variables),
      options
    );
export const GenresDocument = `
    query genres {
  genres {
    id
    name
  }
}
    `;
export const useGenresQuery = <
      TData = GenresQuery,
      TError = unknown
    >(
      variables?: GenresQueryVariables,
      options?: UseQueryOptions<GenresQuery, TError, TData>
    ) =>
    useQuery<GenresQuery, TError, TData>(
      variables === undefined ? ['genres'] : ['genres', variables],
      fetcher<GenresQuery, GenresQueryVariables>(GenresDocument, variables),
      options
    );