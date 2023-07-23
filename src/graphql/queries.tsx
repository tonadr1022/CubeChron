import { gql } from "graphql-tag";
gql`
  query SolvesQuery {
    solves {
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
  query SettingQuery {
    setting {
      cubeType
      cubeSessionId
      focusMode
      id
    }
  }
`;
