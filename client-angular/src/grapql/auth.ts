import {gql} from "apollo-angular";

export const AuthQuery = gql`
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
    ... on WrongPassword{
      message
    }
  }
}
`;
