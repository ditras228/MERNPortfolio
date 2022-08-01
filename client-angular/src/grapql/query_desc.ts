import { gql } from 'apollo-angular';

export const DescQuery = gql`
  query getDesc {
    result: getDesc {
      __typename
      ... on GetDesc {
        id
        text
        img
      }
    }
  }
`;
