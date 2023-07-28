import { Solve, SolveFragment } from "@/__generated__/graphql";

export const getCubeSessionTypeSolves = (
  solves: SolveFragment[],
  cubeSessionId: string,
  cubeType: string
) => {
  return solves
    .filter(
      (solve) =>
        solve.cubeSessionId === cubeSessionId && solve.cubeType === cubeType
    )
    .reverse();
};
