import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
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
};

export type Contacts = {
  __typename?: 'Contacts';
  github: Scalars['String'];
  telegram: Scalars['String'];
};

export type DeleteWorkInput = {
  id: Scalars['Int'];
};

export type GetInfo = {
  __typename?: 'GetInfo';
  contacts: Contacts;
  desc: Scalars['String'];
  experience: Scalars['String'];
  job: Scalars['String'];
  name: Scalars['String'];
};

export type GetTag = {
  __typename?: 'GetTag';
  id: Scalars['Int'];
  title: Scalars['String'];
};

export type GetWork = {
  __typename?: 'GetWork';
  demo: Scalars['String'];
  description: Scalars['String'];
  figma: Scalars['String'];
  github?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  name: Scalars['String'];
  tags: Array<Maybe<GetTag>>;
};

export type GetWorkTag = {
  __typename?: 'GetWorkTag';
  id: Scalars['Int'];
  tagId: Scalars['Int'];
  workId: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  auth: UserOutput;
  deleteWork: GetWork;
  updateInfo: GetInfo;
  updateWork: GetWork;
};


export type MutationAuthArgs = {
  input: UserInput;
};


export type MutationDeleteWorkArgs = {
  input: DeleteWorkInput;
};


export type MutationUpdateInfoArgs = {
  input: UpdateInfo;
};


export type MutationUpdateWorkArgs = {
  input: UpdateWorkInput;
};

export type NotFoundError = ServiceErrorInterface & {
  __typename?: 'NotFoundError';
  message: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  getInfo: GetInfo;
  getTags: Array<Maybe<GetTag>>;
  getTags2: Array<Maybe<GetTag>>;
  getWorks: Array<Maybe<GetWork>>;
};

export type ServiceErrorInterface = {
  message: Scalars['String'];
};

export type UpdateInfo = {
  desc: Scalars['String'];
  experience: Scalars['String'];
  github: Scalars['String'];
  job: Scalars['String'];
  name: Scalars['String'];
  telegram: Scalars['String'];
};

export type UpdateWorkInput = {
  demo: Scalars['String'];
  description: Scalars['String'];
  figma: Scalars['String'];
  github?: InputMaybe<Scalars['String']>;
  id: Scalars['Int'];
  name: Scalars['String'];
  tags: Array<InputMaybe<Scalars['Int']>>;
};

export type User = {
  __typename?: 'User';
  accessToken: Scalars['String'];
  id: Scalars['Int'];
  login: Scalars['String'];
  password: Scalars['String'];
};

export type UserInput = {
  login: Scalars['String'];
  password: Scalars['String'];
};

export type UserOutput = NotFoundError | User | WrongPassword;

export type WrongPassword = ServiceErrorInterface & {
  __typename?: 'WrongPassword';
  message: Scalars['String'];
};

export type AuthMutationVariables = Exact<{
  input: UserInput;
}>;


export type AuthMutation = { __typename?: 'Mutation', auth: { __typename: 'NotFoundError', message: string } | { __typename: 'User', login: string, password: string, accessToken: string } | { __typename: 'WrongPassword', message: string } };

export type GetInfoQueryVariables = Exact<{ [key: string]: never; }>;


export type GetInfoQuery = { __typename?: 'Query', result: { __typename: 'GetInfo', desc: string, experience: string, job: string, name: string, contacts: { __typename?: 'Contacts', telegram: string, github: string } } };

export type UpdateWorkMutationVariables = Exact<{
  input: UpdateWorkInput;
}>;


export type UpdateWorkMutation = { __typename: 'Mutation', result: { __typename?: 'GetWork', id: number, demo: string, description: string, figma: string, github?: string | null, name: string, tags: Array<{ __typename?: 'GetTag', id: number, title: string } | null> } };

export type GetTagsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTagsQuery = { __typename?: 'Query', result: Array<{ __typename: 'GetTag', id: number, title: string } | null> };

export type GetWorksQueryVariables = Exact<{ [key: string]: never; }>;


export type GetWorksQuery = { __typename: 'Query', result: Array<{ __typename?: 'GetWork', id: number, demo: string, description: string, figma: string, github?: string | null, name: string, tags: Array<{ __typename?: 'GetTag', id: number, title: string } | null> } | null> };


export const AuthDocument = `
    mutation auth($input: UserInput!) {
  auth(input: $input) {
    __typename
    ... on User {
      login
      password
      accessToken
    }
    ... on NotFoundError {
      message
    }
    ... on WrongPassword {
      message
    }
  }
}
    `;
export const GetInfoDocument = `
    query getInfo {
  result: getInfo {
    __typename
    desc
    experience
    job
    name
    contacts {
      telegram
      github
    }
  }
}
    `;
export const UpdateWorkDocument = `
    mutation updateWork($input: UpdateWorkInput!) {
  __typename
  result: updateWork(input: $input) {
    id
    demo
    description
    figma
    github
    id
    name
    tags {
      id
      title
    }
  }
}
    `;
export const GetTagsDocument = `
    query getTags {
  result: getTags {
    __typename
    id
    title
  }
}
    `;
export const GetWorksDocument = `
    query getWorks {
  __typename
  result: getWorks {
    id
    demo
    description
    figma
    github
    name
    tags {
      id
      title
    }
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    auth(variables: AuthMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<AuthMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<AuthMutation>(AuthDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'auth', 'mutation');
    },
    getInfo(variables?: GetInfoQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetInfoQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetInfoQuery>(GetInfoDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getInfo', 'query');
    },
    updateWork(variables: UpdateWorkMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpdateWorkMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateWorkMutation>(UpdateWorkDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'updateWork', 'mutation');
    },
    getTags(variables?: GetTagsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetTagsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetTagsQuery>(GetTagsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getTags', 'query');
    },
    getWorks(variables?: GetWorksQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetWorksQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetWorksQuery>(GetWorksDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getWorks', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;