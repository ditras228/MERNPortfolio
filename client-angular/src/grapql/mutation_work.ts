import { gql } from 'apollo-angular';

export const createWorkMutation = gql`
  mutation createWork($input: CreateWorkInput!) {
    result: createWork(input: $input) {
      __typename
      ... on GetWork {
        id
        demo
        description {
          translations {
            locale
            field
          }
        }
        figma
        github
        name {
          translations {
            locale
            field
          }
        }
        tags {
          id
          title
        }
      }
    }
  }
`;

export const updateWorkMutation = gql`
  mutation updateWork($input: UpdateWorkInput!) {
    result: updateWork(input: $input) {
      __typename
      ... on NotFoundError {
        id
        message
      }
      ... on GetWork {
        id
        demo
        description {
          translations {
            locale
            field
          }
        }
        figma
        github
        name {
          translations {
            locale
            field
          }
        }
        tags {
          id
          title
        }
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
