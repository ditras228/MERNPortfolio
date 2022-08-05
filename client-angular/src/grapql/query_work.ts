import { gql } from 'apollo-angular';

export const getWorksQuery = gql`
  query getWorks {
    result: getWorks {
      __typename
      id
      demo
      description {
        field
        translations {
          locale
          field
        }
      }
      figma
      github
      name {
        field
        translations {
          locale
          field
        }
      }
      tags {
        id
        title
      }
    }
  }
`;
