import { graphql } from "@/__generated__";
import React, { Suspense } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { FragmentType } from "@/__generated__/fragment-masking";
import { useSession } from "next-auth/react";
import { selectUser } from "@/redux/slices/userSlice";
import { useAppSelector } from "@/hooks/reduxHooks";
import {
  SettingQueryDocument,
  SolvesQueryDocument,
  UpdateSettingDocument,
} from "@/__generated__/graphql";
import SolveTable from "./solves/SolveTable";
// import CubeDisplay from "./cubeDisplay/CubeDisplay";
import dynamic from "next/dynamic";
import { update } from "lodash";
import { useUpdateSetting } from "@/hooks/settings/useUpdateSetting";
import CubeDisplayToggle from "./cubeDisplay/CubeDisplayToggle";

const CubeDisplay = dynamic(() => import("./cubeDisplay/CubeDisplay"), {
  ssr: false,
});

const RightSideBarSkeleton = () => {
  return (
    <div className="bg-dark-cyan w-80 h-screen hidden sm:flex flex-col">
      <div className="w-full p-2 bg-slate-800 flex flex-col overflow-y-auto h-1/3"></div>
      <div className="placeholder-for-cube-display"></div>
      <div className="placeholder-for-content"></div>
      <div className="placeholder-for-footer"></div>
    </div>
  );
};

const RightSideBar = () => {
  const { data, loading, error } = useQuery(SolvesQueryDocument);
  if (loading) return <RightSideBarSkeleton />;
  if (error) return <div>err</div>;

  const solveData = data?.solves!;
  // const filtered = solveData.filter((solve) => {
  //   return solve.cubeSessionId == cubeSessionId;
  // });
  return (
    <div className="bg-dark-cyan w-80 h-screen hidden sm:flex flex-col">
      <SolveTable solves={solveData} />
      {/* <CubeDisplay /> */}
      <CubeDisplayToggle />
      <div className="flex-1">
        <CubeDisplay />
      </div>
      <div className="bg-gray-400 flex-1"></div>
    </div>
  );
  // return <div>RightSideBar</div>;
};

export default RightSideBar;
