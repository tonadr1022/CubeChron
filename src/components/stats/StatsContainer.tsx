import { Solve, SolveFragment } from "@/__generated__/graphql";
import { calculateStats } from "@/data/calculateStats";
import React from "react";

type Props = {
  solves: SolveFragment[];
};

const StatsContainer: React.FC<Props> = ({ solves }: Props) => {
  let { best, worst, mean } = calculateStats(solves);
  if (solves.length === 0) {
    best = 0;
    worst = 0;
    mean = 0;
  }

  // const {data} = useQuery(SolvesQueryDocument)
  return (
    <>
      <div>{best.toFixed(2)}</div>
      <div>{worst}</div>
      <div>{mean.toFixed(2)}</div>
    </>
  );
};

export default StatsContainer;
