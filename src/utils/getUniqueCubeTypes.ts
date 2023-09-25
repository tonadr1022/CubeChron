import { SolveFragment } from "@/__generated__/graphql";

export const getUniqueCubeTypes = (solves: SolveFragment[]) => {
  const uniqueCubeTypes = new Set<string>();
  solves.forEach((solve) => {
    uniqueCubeTypes.add(solve.cubeType!);
  });
  return Array.from(uniqueCubeTypes);
};
