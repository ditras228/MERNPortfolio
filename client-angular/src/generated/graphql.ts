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

export type DeleteWork = {
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

export type GetWork = {
  __typename?: 'GetWork';
  demo: Scalars['String'];
  description: Scalars['String'];
  figma: Scalars['String'];
  github?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  name: Scalars['String'];
  tags: Scalars['String'];
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
  input: DeleteWork;
};


export type MutationUpdateInfoArgs = {
  input: UpdateInfo;
};


export type MutationUpdateWorkArgs = {
  input: UpdateWork;
};

export type NotFoundError = ServiceErrorInterface & {
  __typename?: 'NotFoundError';
  message: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  getInfo: GetInfo;
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

export type UpdateWork = {
  demo: Scalars['String'];
  description: Scalars['String'];
  figma: Scalars['String'];
  github?: InputMaybe<Scalars['String']>;
  id: Scalars['Int'];
  name: Scalars['String'];
  tags: Scalars['String'];
};

export type User = {
  __typename?: 'User';
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


export type AuthMutation = { __typename?: 'Mutation', auth: { __typename: 'NotFoundError', message: string } | { __typename: 'User', login: string, password: string } | { __typename: 'WrongPassword', message: string } };

export type GetWorksQueryVariables = Exact<{ [key: string]: never; }>;


export type GetWorksQuery = { __typename: 'Query', result: Array<{ __typename: 'GetWork', demo: string, description: string, figma: string, github?: string | null, id: number, name: string, tags: string } | null> };

export type GetInfoQueryVariables = Exact<{ [key: string]: never; }>;


export type GetInfoQuery = { __typename?: 'Query', result: { __typename: 'GetInfo', desc: string, experience: string, job: string, name: string, contacts: { __typename?: 'Contacts', telegram: string, github: string } } };


export const AuthDocument = `
    mutation auth($input: UserInput!) {
  auth(input: $input) {
    __typename
    ... on User {
      login
      password
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
export const GetWorksDocument = `
    query getWorks {
  __typename
  result: getWorks {
    __typename
    demo
    description
    figma
    github
    id
    name
    tags
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

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    auth(variables: AuthMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<AuthMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<AuthMutation>(AuthDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'auth', 'mutation');
    },
    getWorks(variables?: GetWorksQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetWorksQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetWorksQuery>(GetWorksDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getWorks', 'query');
    },
    getInfo(variables?: GetInfoQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetInfoQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetInfoQuery>(GetInfoDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getInfo', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;