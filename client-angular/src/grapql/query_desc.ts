import {gql} from "apollo-angular";

export const DescQuery = gql`
  query getDesc {
  __typename
  result: getDesc {
    __typename
    ... on GetDescResult{
      desc{
        id
        text
        imgURL

      }
    }
  }
}
`;
