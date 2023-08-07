import { graphql } from "@/__generated__";
import { gql } from "@apollo/client";

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
      ...CubeSession
    }
  }
`;

gql`
  mutation updateCubeSession($id: String!, $input: CubeSessionUpdateInput!) {
    updateCubeSession(id: $id, input: $input) {
      id
      name
      cubeType
      notes
    }
  }
`;

gql`
  mutation deleteCubeSession($id: String!) {
    deleteCubeSession(id: $id) {
      id
    }
  }
`;
