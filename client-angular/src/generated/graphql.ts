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
  githubLink: Scalars['String'];
  githubTitle: Scalars['String'];
  telegramLink: Scalars['String'];
  telegramTitle: Scalars['String'];
};

export type CreateDescInput = {
  imgURL: Scalars['String'];
  text: Scalars['String'];
};

export type CreateDescOutput = GetDesc | UnexpectedError;

export type DeleteDescInput = {
  id: Scalars['Int'];
};

export type DeleteDescOutput = GetDesc | NotFoundError | UnexpectedError;

export type DeleteWorkInput = {
  id: Scalars['Int'];
};

export type DeleteWorkOutput = DeleteWorkResult | NotFoundError | UnexpectedError;

export type DeleteWorkResult = {
  __typename?: 'DeleteWorkResult';
  id: Scalars['Int'];
};

export type GetDesc = {
  __typename?: 'GetDesc';
  id: Scalars['Int'];
  imgURL: Scalars['String'];
  text: Scalars['String'];
};

export type GetDescOutput = GetDescResult | NotFoundError | UnexpectedError;

export type GetDescResult = {
  __typename?: 'GetDescResult';
  desc?: Maybe<Array<Maybe<GetDesc>>>;
};

export type GetInfo = {
  __typename?: 'GetInfo';
  contacts: Contacts;
  desc: Array<Maybe<GetDesc>>;
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
  createDesc: CreateDescOutput;
  deleteDesc: DeleteDescOutput;
  deleteWork: DeleteWorkOutput;
  updateDesc: UpdateDescOutput;
  updateInfo: GetInfo;
  updateWork: GetWork;
};


export type MutationAuthArgs = {
  input: UserInput;
};


export type MutationCreateDescArgs = {
  input: CreateDescInput;
};


export type MutationDeleteDescArgs = {
  input: DeleteDescInput;
};


export type MutationDeleteWorkArgs = {
  input: DeleteWorkInput;
};


export type MutationUpdateDescArgs = {
  input: UpdateDescInput;
};


export type MutationUpdateInfoArgs = {
  input: UpdateInfoInput;
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
  getDesc: GetDescOutput;
  getInfo: GetInfo;
  getTags: Array<Maybe<GetTag>>;
  getWorks: Array<Maybe<GetWork>>;
};

export type ServiceErrorInterface = {
  message: Scalars['String'];
};

export type UnexpectedError = ServiceErrorInterface & {
  __typename?: 'UnexpectedError';
  message: Scalars['String'];
};

export type UpdateDescInput = {
  id: Scalars['Int'];
  imgURL: Scalars['String'];
  text: Scalars['String'];
};

export type UpdateDescOutput = GetDesc | NotFoundError | UnexpectedError;

export type UpdateInfoInput = {
  desc: Scalars['String'];
  experience: Scalars['String'];
  githubLink: Scalars['String'];
  githubTitle: Scalars['String'];
  job: Scalars['String'];
  name: Scalars['String'];
  telegramLink: Scalars['String'];
  telegramTitle: Scalars['String'];
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

export type UpdateWorkOutput = GetWork | NotFoundError | UnexpectedError;

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

export type DeleteWorkMutationVariables = Exact<{
  input: DeleteWorkInput;
}>;


export type DeleteWorkMutation = { __typename: 'Mutation', result: { __typename: 'DeleteWorkResult', id: number } | { __typename: 'NotFoundError' } | { __typename: 'UnexpectedError' } };

export type GetInfoQueryVariables = Exact<{ [key: string]: never; }>;


export type GetInfoQuery = { __typename?: 'Query', result: { __typename: 'GetInfo', experience: string, job: string, name: string, desc: Array<{ __typename?: 'GetDesc', id: number, text: string, imgURL: string } | null>, contacts: { __typename?: 'Contacts', telegramTitle: string, telegramLink: string, githubTitle: string, githubLink: string } } };

export type CreateDescMutationVariables = Exact<{
  input: CreateDescInput;
}>;


export type CreateDescMutation = { __typename?: 'Mutation', result: { __typename: 'GetDesc', id: number, text: string, imgURL: string } | { __typename: 'UnexpectedError' } };

export type UpdateDescMutationVariables = Exact<{
  input: UpdateDescInput;
}>;


export type UpdateDescMutation = { __typename?: 'Mutation', result: { __typename: 'GetDesc', id: number, text: string, imgURL: string } | { __typename: 'NotFoundError' } | { __typename: 'UnexpectedError' } };

export type UpdateInfoMutationVariables = Exact<{
  input: UpdateInfoInput;
}>;


export type UpdateInfoMutation = { __typename: 'Mutation', result: { __typename?: 'GetInfo', experience: string, job: string, name: string, desc: Array<{ __typename?: 'GetDesc', id: number, text: string, imgURL: string } | null>, contacts: { __typename?: 'Contacts', telegramTitle: string, telegramLink: string, githubTitle: string, githubLink: string } } };

export type UpdateWorkMutationVariables = Exact<{
  input: UpdateWorkInput;
}>;


export type UpdateWorkMutation = { __typename: 'Mutation', result: { __typename?: 'GetWork', id: number, demo: string, description: string, figma: string, github?: string | null, name: string, tags: Array<{ __typename?: 'GetTag', id: number, title: string } | null> } };

export type GetDescQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDescQuery = { __typename: 'Query', result: { __typename: 'GetDescResult', desc?: Array<{ __typename?: 'GetDesc', id: number, text: string, imgURL: string } | null> | null } | { __typename: 'NotFoundError' } | { __typename: 'UnexpectedError' } };

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
export const DeleteWorkDocument = `
    mutation deleteWork($input: DeleteWorkInput!) {
  __typename
  result: deleteWork(input: $input) {
    __typename
    ... on DeleteWorkResult {
      id
    }
  }
}
    `;
export const GetInfoDocument = `
    query getInfo {
  result: getInfo {
    __typename
    desc {
      id
      text
      imgURL
    }
    experience
    job
    name
    contacts {
      telegramTitle
      telegramLink
      githubTitle
      githubLink
    }
  }
}
    `;
export const CreateDescDocument = `
    mutation createDesc($input: CreateDescInput!) {
  result: createDesc(input: $input) {
    __typename
    ... on GetDesc {
      id
      text
      imgURL
    }
  }
}
    `;
export const UpdateDescDocument = `
    mutation updateDesc($input: UpdateDescInput!) {
  result: updateDesc(input: $input) {
    __typename
    ... on GetDesc {
      id
      text
      imgURL
    }
  }
}
    `;
export const UpdateInfoDocument = `
    mutation updateInfo($input: UpdateInfoInput!) {
  __typename
  result: updateInfo(input: $input) {
    desc {
      id
      text
      imgURL
    }
    experience
    job
    name
    contacts {
      telegramTitle
      telegramLink
      githubTitle
      githubLink
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
export const GetDescDocument = `
    query getDesc {
  __typename
  result: getDesc {
    __typename
    ... on GetDescResult {
      desc {
        id
        text
        imgURL
      }
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
    deleteWork(variables: DeleteWorkMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<DeleteWorkMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteWorkMutation>(DeleteWorkDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'deleteWork', 'mutation');
    },
    getInfo(variables?: GetInfoQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetInfoQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetInfoQuery>(GetInfoDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getInfo', 'query');
    },
    createDesc(variables: CreateDescMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<CreateDescMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateDescMutation>(CreateDescDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createDesc', 'mutation');
    },
    updateDesc(variables: UpdateDescMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpdateDescMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateDescMutation>(UpdateDescDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'updateDesc', 'mutation');
    },
    updateInfo(variables: UpdateInfoMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpdateInfoMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateInfoMutation>(UpdateInfoDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'updateInfo', 'mutation');
    },
    updateWork(variables: UpdateWorkMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpdateWorkMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateWorkMutation>(UpdateWorkDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'updateWork', 'mutation');
    },
    getDesc(variables?: GetDescQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetDescQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetDescQuery>(GetDescDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getDesc', 'query');
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