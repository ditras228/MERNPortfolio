import {gql} from "apollo-angular";

export const getWorksQuery = gql`
  query getWorks {
    __typename
    result: getWorks {
      id
      demo
      description
      figma
      github
      name
      tags{
        id
        title
      }
    }
  }
`;
