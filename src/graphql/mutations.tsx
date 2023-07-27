import { graphql } from "@/__generated__";
import { gql } from "@apollo/client";

export const SOLVE_FRAGMENT = gql`
  fragment Solve on Solve {
    id
    duration
    createdAt
    dnf
    plusTwo
    scramble
    cubeType
    cubeSessionId
    notes
  }
`;

gql`
  mutation createSolve($input: CreateSolveInput!) {
    createSolve(input: $input) {
      ...Solve
    }
  }
`;
gql`
  mutation deleteSolve($id: String!) {
    deleteSolve(id: $id) {
      id
    }
  }
`;
gql`
  mutation updateSolve($id: String!, $input: UpdateSolveInput!) {
    updateSolve(id: $id, input: $input) {
      ...Solve
    }
  }
`;

gql`
  mutation updateSetting($input: UpdateSettingInput!) {
    updateSetting(input: $input) {
      id
      focusMode
      cubeType
      barView
      cubeDisplayDimension
      cubeSessionId
    }
  }
`;

gql`
  mutation createCubeSession($input: CubeSessionInput!) {
    createCubeSession(input: $input) {
      id
      name
      cubeType
      notes
    }
  }
`;
