import {gql} from "apollo-angular";

export const updateWorkMutation = gql`
  mutation updateWork($input: UpdateWorkInput!) {
  __typename
  result: updateWork(input: $input) {
    id
    demo
    description
    figma
    github
    id
    name
    tags{
      id
      title
    }
  }
}
`;
