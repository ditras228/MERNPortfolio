import { gql } from 'apollo-angular';

export const DescQuery = gql`
  query getDesc {
    result: getDesc {
      __typename
      ... on GetDescResult {
        desc {
          id
          text
          img
        }
      }
    }
  }
`;
