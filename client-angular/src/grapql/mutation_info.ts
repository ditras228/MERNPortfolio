import {gql} from "apollo-angular";

export const getInfoQuery = gql`
  mutation updateInfo($input: UpdateInfoInput!) {
  __typename
  result: updateInfo(input: $input) {
    desc{
      id
      text
      imgURL
    }
    experience
    job
    name
    contacts{
      telegramTitle
      telegramLink
      githubTitle
      githubLink
    }
  }
}`;
