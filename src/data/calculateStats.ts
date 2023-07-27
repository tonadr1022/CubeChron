import { Solve, SolveFragment } from "@/__generated__/graphql";

export const calculateStats = (
  solves: SolveFragment[]
): { mean: number; best: number; worst: number } => {
  const durations = solves.map((solve) => solve.duration!);
  const sorted = durations.sort((a, b) => a - b);
  const sum = durations.reduce((a, b) => a + b, 0);

  const mean = sum / durations.length;
  const best = sorted[0];
  const worst = sorted[sorted.length - 1];

  const stats = { mean, best, worst };
  // calculate to fixed of 4 places for each in stats
  // Object.keys(stats).forEach((key) => {
  //     stats[key] = Number(stats[key].toFixed(4));
  // });

  return { mean, best, worst };
};
