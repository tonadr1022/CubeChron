import { gql } from "@apollo/client";

// gql`
//   mutation CreateSolve($input: CreateSolveInput!) {
//     createSolve(input: $input) (
//       id
//       userId
//       scramble
//       plusTwo
//       notes
//       duration
//       dnf
//       cubeType
//       cubeSessionId
//     )
//   }
// `;
gql`
  mutation createSolve($input: CreateSolveInput!) {
    createSolve(input: $input) {
      createdAt
      cubeSessionId
      cubeType
      dnf
      duration
      id
      notes
      plusTwo
      scramble
    }
  }
`;
gql`
  mutation deleteSolve($id: String!) {
    deleteSolve(id: $id) {
      id
      createdAt
      cubeSessionId
      scramble
      cubeType
      notes
      dnf
      plusTwo
      duration
    }
  }
`;
gql`
  mutation updateSolve($id: String!, $input: UpdateSolveInput!) {
    updateSolve(id: $id, input: $input) {
      createdAt
      cubeSessionId
      cubeType
      dnf
      duration
      id
      notes
      plusTwo
      scramble
    }
  }
`;
