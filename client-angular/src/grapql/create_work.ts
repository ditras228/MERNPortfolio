import {gql} from "apollo-angular";


export const createWorkMutation = gql`
  mutation createWork($input: CreateWorkInput!) {
  result: createWork(input: $input) {
    __typename
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
