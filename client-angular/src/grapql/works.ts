import {gql} from "apollo-angular";

export const getInfoQuery = gql`
  query getInfo {
    result: getInfo {
      __typename
      desc
      experience
      job
      name
      contacts{
        telegram
        github
      }
    }
  }`;
