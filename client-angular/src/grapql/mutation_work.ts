import {gql} from "apollo-angular";

export const updateWorkMutation = gql`
  mutation updateWork($input: UpdateWorkInput!) {
  result: updateWork(input: $input) {
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
