import { gql } from 'apollo-angular';

export const createWorkMutation = gql`
  mutation createWork($input: CreateWorkInput!) {
    result: createWork(input: $input) {
      __typename
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

export const updateWorkMutation = gql`
  mutation updateWork($input: UpdateWorkInput!) {
    result: updateWork(input: $input) {
      __typename
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

export const deleteWorkMutation = gql`
  mutation deleteWork($input: DeleteWorkInput!) {
    result: deleteWork(input: $input) {
      __typename
      ... on DeleteWorkResult {
        id
      }
    }
  }
`;
