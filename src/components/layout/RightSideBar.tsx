import React, { useRef } from "react";
import { useQuery } from "@apollo/client";

import {
  SettingQueryDocument,
  SolvesQueryDocument,
} from "@/__generated__/graphql";
import SolveTable from "../solves/SolveTable";
// import CubeDisplay from "./cubeDisplay/CubeDisplay";
import dynamic from "next/dynamic";
import SolvesOverTime from "../graphs/SolvesOverTime";
import Loading from "../common/Loading";
import { getCubeSessionTypeSolves } from "@/data/getCubeSessionTypeSolves";
const SolveTableMemoized = React.memo(SolveTable);

const CubeDisplay = dynamic(() => import("../cubeDisplay/CubeDisplay"), {
  ssr: false,
});

const RightSideBarSkeleton = () => {
  return (
    <>
      <div className="w-full p-2 bg-base-200 flex flex-col overflow-y-auto h-1/3"></div>
      <div className="placeholder-for-cube-display"></div>
      <div className="placeholder-for-content"></div>
      <div className="placeholder-for-footer"></div>
    </>
  );
};

const RightSideBar = () => {
  const parentContainerRef = useRef<HTMLDivElement>(null);
  const { data, loading, error } = useQuery(SolvesQueryDocument);
  const { data: setting, loading: loading2 } = useQuery(SettingQueryDocument);
  if (loading || loading2) return <Loading />;

  const cubeSessionId = setting?.setting.cubeSessionId!;
  const cubeType = setting?.setting.cubeType!;

  // if (loading) return <Loading />;
  const solves = data?.solves
    ? getCubeSessionTypeSolves(data?.solves, cubeSessionId, cubeType)
    : [];
  return (
    <div
      ref={parentContainerRef}
      className=" hidden md:w-80' md:flex md:flex-col py-4 pr-4 box-content gap-2">
      <div className="w-full p-2 bg-base-300 rounded-xl flex flex-col overflow-y-auto h-1/3">
        <SolveTableMemoized solves={solves} />
      </div>
      {/* <div className="grid grid-cols-4 gap-4, text-center flex-1"> */}
      <div className="flex-1 h-1/3">
        <SolvesOverTime solves={solves} />
      </div>
      <div>
        <CubeDisplay containerRef={parentContainerRef} />
      </div>
    </div>
  );
  // return <div>RightSideBar</div>;
};

export default RightSideBar;
{
  /* <StatsContainer solves={solveData} /> */
}
