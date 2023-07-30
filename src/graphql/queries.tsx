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
  query Solve {
    solve {
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
      cubeDisplayDimension
      barView
      focusMode
      id
    }
  }
`;

gql`
  query CubeSessions {
    cubeSessions {
      id
      name
      notes
      createdAt
    }
  }
`;

// gql`
//   query SolvesByCubeSession($cubeSessionId: String!) {
//     solvesByCubeSession(cubeSessionId: $cubeSessionId) {
//       id
//       createdAt
//       cubeSessionId
//       scramble
//       cubeType
//       notes
//       dnf
//       plusTwo
//       duration
//       userId
//     }
//   }
// `;
