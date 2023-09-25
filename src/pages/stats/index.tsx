import { SolvesQueryDocument } from "@/__generated__/graphql";
import Loading from "@/components/common/Loading";
import TitleBar from "@/components/pages/TitleBar";
import ViewOptions from "@/components/pages/stats/ViewOptions";
import { CUBE_TYPE_OPTIONS } from "@/constants/constants";
import { getUniqueCubeTypes } from "@/utils/getUniqueCubeTypes";
import { useQuery } from "@apollo/client";
import clsx from "clsx";
import React, { useState } from "react";
import { Toaster } from "react-hot-toast";

const StatsPage = () => {
  const { data, loading, error } = useQuery(SolvesQueryDocument);
  const solves = data?.solves;
  let statsViewOptions = getUniqueCubeTypes(solves!);
  statsViewOptions = ["all", ...statsViewOptions];
  const [activeViewOption, setActiveViewOption] = useState("all");

  const handleOptionClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const value = e.currentTarget.value;
    setActiveViewOption(value);
  };

  if (loading) return <Loading />;
  return (
    <div className="p-6">
      <Toaster position="bottom-left" />
      <TitleBar title="Stats" />
      <ViewOptions />
    </div>
  );
};

export default StatsPage;
