import React, { useRef } from "react";
import SolveTable from "../solves/SolveTable";
import Loading from "../common/Loading";
import { useQuery } from "@apollo/client";
import {
  SettingQueryDocument,
  SolvesQueryDocument,
} from "@/__generated__/graphql";
import { getCubeSessionTypeSolves } from "@/data/getCubeSessionTypeSolves";
const SolveTableMemoized = React.memo(SolveTable);

const BottomBar = () => {
  const parentContainerRef = useRef<HTMLDivElement>(null);
  const { data, loading, error } = useQuery(SolvesQueryDocument);
  const { data: setting, loading: loading2 } = useQuery(SettingQueryDocument);
  if (loading || loading2) return <Loading />;
  const cubeSessionId = setting?.setting.cubeSessionId!;
  const cubeType = setting?.setting.cubeType!;
  const solves = data?.solves
    ? getCubeSessionTypeSolves(data?.solves, cubeSessionId, cubeType)
    : [];
  return (
    <div className="w-full p-2 bg-base-300 rounded-xl flex flex-col overflow-y-auto">
      <SolveTableMemoized solves={solves} />
    </div>
    // <div className="flex-1 h-1/3">
    //   <SolvesOverTime solves={solves} />
    // </div>
    // <div>
    //   <CubeDisplay containerRef={parentContainerRef} />
    // </div>
  );
};

export default BottomBar;
