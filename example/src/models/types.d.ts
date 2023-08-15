export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DeferredID: { input: any; output: any; }
};

export type Category = {
  __typename?: 'Category';
  id?: Maybe<Scalars['DeferredID']['output']>;
  posts?: Maybe<PostConnection>;
  title?: Maybe<Scalars['String']['output']>;
};


export type CategoryPostsArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  data?: InputMaybe<Array<InputMaybe<PostInput>>>;
  filter?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['String']['input']>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  op?: InputMaybe<ElideRelationshipOp>;
  sort?: InputMaybe<Scalars['String']['input']>;
};

export type CategoryConnection = {
  __typename?: 'CategoryConnection';
  edges?: Maybe<Array<Maybe<CategoryEdge>>>;
  pageInfo?: Maybe<PageInfo>;
};

export type CategoryEdge = {
  __typename?: 'CategoryEdge';
  node?: Maybe<Category>;
};

export type CategoryInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  posts?: InputMaybe<Array<InputMaybe<PostInput>>>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export enum ElideRelationshipOp {
  Delete = 'DELETE',
  Fetch = 'FETCH',
  Remove = 'REMOVE',
  Replace = 'REPLACE',
  Update = 'UPDATE',
  Upsert = 'UPSERT'
}

export type Mutation = {
  __typename?: 'Mutation';
  category?: Maybe<CategoryConnection>;
  post?: Maybe<PostConnection>;
};


export type MutationCategoryArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  data?: InputMaybe<Array<InputMaybe<CategoryInput>>>;
  filter?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['String']['input']>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  op?: InputMaybe<ElideRelationshipOp>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


export type MutationPostArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  data?: InputMaybe<Array<InputMaybe<PostInput>>>;
  filter?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['String']['input']>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  op?: InputMaybe<ElideRelationshipOp>;
  sort?: InputMaybe<Scalars['String']['input']>;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage?: Maybe<Scalars['Boolean']['output']>;
  startCursor?: Maybe<Scalars['String']['output']>;
  totalRecords?: Maybe<Scalars['Int']['output']>;
};

export type Post = {
  __typename?: 'Post';
  category?: Maybe<CategoryConnection>;
  content?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['DeferredID']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};


export type PostCategoryArgs = {
  data?: InputMaybe<CategoryInput>;
  op?: InputMaybe<ElideRelationshipOp>;
};

export type PostConnection = {
  __typename?: 'PostConnection';
  edges?: Maybe<Array<Maybe<PostEdge>>>;
  pageInfo?: Maybe<PageInfo>;
};

export type PostEdge = {
  __typename?: 'PostEdge';
  node?: Maybe<Post>;
};

export type PostInput = {
  category?: InputMaybe<CategoryInput>;
  content?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type Query = {
  __typename?: 'Query';
  category?: Maybe<CategoryConnection>;
  post?: Maybe<PostConnection>;
};


export type QueryCategoryArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  data?: InputMaybe<Array<InputMaybe<CategoryInput>>>;
  filter?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['String']['input']>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  op?: InputMaybe<ElideRelationshipOp>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


export type QueryPostArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  data?: InputMaybe<Array<InputMaybe<PostInput>>>;
  filter?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['String']['input']>;
  ids?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  op?: InputMaybe<ElideRelationshipOp>;
  sort?: InputMaybe<Scalars['String']['input']>;
};
