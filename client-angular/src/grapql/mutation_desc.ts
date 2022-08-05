import { gql } from 'apollo-angular';
export const deleteDescMutation = gql`
  mutation deleteDesc($input: DeleteDescInput!) {
    result: deleteDesc(input: $input) {
      __typename
      ... on DeleteDescResult {
        id
      }
      ... on NotFoundError {
        message
        id
      }
    }
  }
`;

export const createDescMutation = gql`
  mutation createDesc($input: CreateDescInput!) {
    result: createDesc(input: $input) {
      __typename
      ... on GetDesc {
        id
        text {
          field
          translations {
            locale
            field
          }
        }
        img
      }
    }
  }
`;

export const updateDescMutation = gql`
  mutation updateDesc($input: UpdateDescInput!) {
    result: updateDesc(input: $input) {
      __typename
      ... on GetDesc {
        id
        text {
          field
          translations {
            locale
            field
          }
        }
        img
      }
      ... on NotFoundError {
        message
        id
      }
    }
  }
`;
