import { gql } from 'apollo-angular';

export const getInfoQuery = gql`
  query getInfo {
    result: getInfo {
      __typename
      desc {
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
      experience {
        field
        translations {
          locale
          field
        }
      }
      job
      name {
        field
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
