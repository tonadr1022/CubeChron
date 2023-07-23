import { graphql } from "@/__generated__";
import React from "react";
import { gql, useQuery } from "@apollo/client";
import { FragmentType } from "@/__generated__/fragment-masking";
import { useSession } from "next-auth/react";
import { selectUser } from "@/redux/slices/userSlice";
import { useAppSelector } from "@/hooks/reduxHooks";
import {
  SettingQueryDocument,
  SolvesQueryDocument,
} from "@/__generated__/graphql";
import SolveTable from "./solves/SolveTable";

const RightSideBar = () => {
  const userId = useAppSelector(selectUser);
  const { data: setting } = useQuery(SettingQueryDocument);
  const cubeSessionId = setting?.setting?.cubeSessionId!;
  const cubeType = setting?.setting?.cubeType!;

  const { data, loading, error } = useQuery(SolvesQueryDocument);
  console.log("data");
  if (loading) return <div>solve data loading</div>;
  if (error) return <div>err</div>;

  const solveData = data?.solves!;
  // const filtered = solveData.filter((solve) => {
  //   return solve.cubeSessionId == cubeSessionId;
  // });
  return (
    <div className="bg-dark-cyan w-80 h-screen hidden sm:flex flex-col">
      <SolveTable solves={solveData} />
      <div className="bg-black flex-1">{/* <h1>{user.name}</h1> */}</div>
      <div className="bg-gray-400 flex-1"></div>
    </div>
  );
  // return <div>RightSideBar</div>;
};

export default RightSideBar;
