import {gql} from "apollo-angular";
export const deleteDescMutation = gql`
  mutation deleteDesc($input: DeleteDescInput!){
    result: deleteDesc (input: $input){
      __typename
      ... on GetDesc{
        id
      }
    }
  }`;

export const createDescMutation = gql`
  mutation createDesc($input: CreateDescInput!){
  result: createDesc (input: $input){
    __typename
    ... on GetDesc{
      id
      text
      imgURL
    }
  }
}`;

export const updateDescMutation = gql`
  mutation updateDesc($input: UpdateDescInput!){
    result: updateDesc (input: $input){
      __typename
      ... on GetDesc{
        id
        text
        imgURL
      }
    }
  }`;
