import { gql } from "@apollo/client";

export const CUBE_SESSION_FRAGMENT = gql`
  fragment CubeSessionFragment on CubeSession {
    name
    cubeType
    notes
  }
`;
