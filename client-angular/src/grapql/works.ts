import {gql} from "apollo-angular";

export const getInfoQuery = gql`
  query getInfo {
    result: getInfo {
      __typename
      desc
      experience
      github
      job
      name
      telegram
    }
  }`;
