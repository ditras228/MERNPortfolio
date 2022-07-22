import { gql } from 'apollo-angular';

export const getInfoQuery = gql`
  query getInfo {
    result: getInfo {
      __typename
      desc {
        id
        text
        imgURL
      }
      experience
      job
      name
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
