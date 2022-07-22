import {gql} from "apollo-angular";

export const getInfoQuery = gql`
  mutation updateInfo($input: UpdateInfoInput!) {
  result: updateInfo(input: $input) {
    __typename
    experience
    job
    name
    img
    contacts{
      telegramTitle
      telegramLink
      githubTitle
      githubLink
    }
  }
}`;
