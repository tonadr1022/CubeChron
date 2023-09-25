import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../..//tailwind.config.js";
import { SolveFragment } from "@/__generated__/graphql";
import React, { useMemo } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
} from "recharts";
import {
  ValueType,
  NameType,
} from "recharts/types/component/DefaultTooltipContent";
import NoSolves from "../common/NoSolves";

const CustomTooltip = ({ payload }: TooltipProps<ValueType, NameType>) => {
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

type Props = { solves: SolveFragment[]; elHeight?: number | null };

const SolvesOverTime = ({ solves, elHeight }: Props) => {
  const reversed = useMemo(() => [...solves].reverse(), [solves]);
  return solves.length ? (
    <ResponsiveContainer
      width={"100%"}
      height={elHeight || "100%"}
      className="bg-base-300 rounded-lg">
      <LineChart data={reversed} className="-ml-4">
        <Line
          isAnimationActive={false}
          dot={false}
          dataKey="duration"
          stroke="#36d399"
          strokeWidth={5}
        />
        <YAxis
          tickCount={6}
          padding={{ top: 0, bottom: 0 }}
          style={{ margin: 1 }}
          stroke={"#36d399"}
          axisLine={false}
          tickLine={false}
          // tick={CustomYAxisTick}
        />
        <Tooltip content={<CustomTooltip />} />
      </LineChart>
    </ResponsiveContainer>
  ) : (
    <NoSolves />
  );
};

export default SolvesOverTime;
