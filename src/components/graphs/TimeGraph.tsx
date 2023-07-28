import { SolveFragment } from "@/__generated__/graphql";
import React from "react";
import {
  LineChart,
  Line,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
} from "recharts";
import {
  ValueType,
  NameType,
} from "recharts/types/component/DefaultTooltipContent";
type ToolTipProps = {
  active?: boolean;
  payload?: SolveFragment;
};
const CustomTooltip = ({
  active,
  payload,
}: TooltipProps<ValueType, NameType>) => {
  if (!payload || !payload[0]) return null;
  const solve: SolveFragment = payload[0].payload;
  return (
    <div className="bg-primary bg-opacity-25 p-2 text-base rounded-lg">
      <p className="">Date: {new Date(solve.createdAt).toLocaleDateString()}</p>
      <p>Time: {new Date(solve.createdAt).toLocaleTimeString()}</p>
      <p>Duration: {solve.duration}</p>
      <p className="text-error">{solve.dnf && "DNF"}</p>
      <p className="text-warning">{solve.plusTwo && "Plus Two"}</p>
    </div>
  );
};

type Props = { solves: SolveFragment[] };
const SolvesOverTime = ({ solves }: Props) => {
  return (
    <ResponsiveContainer
      width={"100%"}
      height="100%"
      className="bg-base-300 rounded-lg">
      <LineChart data={solves} className="-ml-4">
        <Line dot={false} dataKey="duration" stroke="#8884d8" strokeWidth={5} />
        <YAxis
          tickCount={6}
          padding={{ top: 0, bottom: 0 }}
          style={{ margin: 1 }}
          axisLine={false}
          tickLine={false}
          // tick={CustomYAxisTick}
        />
        <Tooltip content={<CustomTooltip />} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default SolvesOverTime;
