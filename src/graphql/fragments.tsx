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
export const CUBE_SESSION_FRAGMENT = gql`
  fragment CubeSession on CubeSession {
    id
    createdAt
    name
    cubeType
    notes
  }
`;
