import { gql } from 'apollo-angular';

export const getTagsQuery = gql`
  query getTags {
    result: getTags {
      __typename
      id
      title
    }
  }
`;
