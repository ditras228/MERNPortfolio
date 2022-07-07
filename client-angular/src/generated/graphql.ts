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

export type Info = {
  __typename?: 'Info';
  desc: Scalars['String'];
  experience: Scalars['String'];
  github?: Maybe<Scalars['String']>;
  job: Scalars['String'];
  name: Scalars['String'];
  telegram: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  editInfo: Info;
};


export type MutationEditInfoArgs = {
  input: EditInfo;
};

export type Query = {
  __typename?: 'Query';
  getInfo: Info;
  getWorks: Array<Maybe<Work>>;
};

export type Work = {
  __typename?: 'Work';
  demo: Scalars['String'];
  description: Scalars['String'];
  figma: Scalars['String'];
  github?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  name: Scalars['String'];
  tags: Scalars['String'];
};

export type EditInfo = {
  desc: Scalars['String'];
  experience: Scalars['String'];
  github?: InputMaybe<Scalars['String']>;
  job: Scalars['String'];
  name: Scalars['String'];
  telegram: Scalars['String'];
};

export type GetWorksQueryVariables = Exact<{ [key: string]: never; }>;


export type GetWorksQuery = { __typename: 'Query', result: Array<{ __typename: 'Work', demo: string, description: string, figma: string, github?: string | null, id: number, name: string, tags: string } | null> };

export type GetInfoQueryVariables = Exact<{ [key: string]: never; }>;


export type GetInfoQuery = { __typename?: 'Query', result: { __typename: 'Info', desc: string, experience: string, github?: string | null, job: string, name: string, telegram: string } };


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
    github
    job
    name
    telegram
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    getWorks(variables?: GetWorksQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetWorksQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetWorksQuery>(GetWorksDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getWorks', 'query');
    },
    getInfo(variables?: GetInfoQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetInfoQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetInfoQuery>(GetInfoDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getInfo', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;