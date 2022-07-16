import {gql} from "apollo-angular";

export const deleteWorkMutation = gql`
  mutation deleteWork($input: DeleteWorkInput!) {
    __typename
    result: deleteWork(input: $input) {
      __typename
      ... on DeleteWorkResult{
        id
      }
    }
  }
`;
