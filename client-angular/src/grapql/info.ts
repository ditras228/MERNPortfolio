import {gql} from "apollo-angular";

export const getWorksQuery = gql`
  query getWorks {
    __typename

    result: getWorks {
      __typename
      demo
      description
      figma
      github
      id
      name
      tags
    }
  }
`;
