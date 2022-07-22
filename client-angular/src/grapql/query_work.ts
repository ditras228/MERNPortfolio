import { gql } from 'apollo-angular';

export const getWorksQuery = gql`
  query getWorks {
    result: getWorks {
      __typename
      id
      demo
      description
      figma
      github
      name
      tags {
        id
        title
      }
    }
  }
`;
