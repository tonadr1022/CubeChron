import { SolveFragment } from "@/__generated__/graphql";
import React from "react";
import { ResponsiveContainer } from "recharts";

type Props = { solves: SolveFragment[]; elHeight?: number | null };

// const TimeDistGraph = ({ solves, elHeight }: Props) => {
//   return solves.length ? (
//     <ResponsiveContainer
//       width={"100%"}
//       height={elHeight || "100%"}
//       className="bg-base-300 rounded-lg">
//       <LineChart data={solves} className="-ml-4">
//         <Line
//           isAnimationActive={false}
//           dot={false}
//           dataKey="duration"
//           stroke="#36d399"
//           strokeWidth={5}
//         />
//         <YAxis
//           tickCount={6}
//           padding={{ top: 0, bottom: 0 }}
//           style={{ margin: 1 }}
//           stroke={"#36d399"}
//           axisLine={false}
//           tickLine={false}
//           // tick={CustomYAxisTick}
//         />
//         <Tooltip content={<CustomTooltip />} />
//       </LineChart>
//     </Responsi>
//   ) : (
//     <NoSolves />
//   );
// };

// export default TimeDistGraph
