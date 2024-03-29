import { gql } from 'apollo-angular';

export const getInfoQuery = gql`
  mutation updateInfo($input: UpdateInfoInput!) {
    result: updateInfo(input: $input) {
      __typename
      experience {
        translations {
          locale
          field
        }
      }
      job
      name {
        translations {
          locale
          field
        }
      }
      img
      contacts {
        telegramTitle
        telegramLink
        githubTitle
        githubLink
      }
    }
  }
`;
