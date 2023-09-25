import React, { Suspense, useEffect, useRef, useState } from "react";

import SolveTable from "../solves/SolveTable";
// import CubeDisplay from "./cubeDisplay/CubeDisplay";
import dynamic from "next/dynamic";
import SolvesOverTime from "../graphs/SolvesOverTime";
import Loading from "../common/Loading";
import { useSessionTypeSolves } from "@/hooks/solves/useSessionTypeSolves";
import ModuleSelect from "./ModuleSelect";
import { useAppSelector } from "@/hooks/reduxHooks";
import StatsModule from "../stats/StatsModule";
import clsx from "clsx";
import NoSolves from "../common/NoSolves";

const SolveTableMemoized = React.memo(SolveTable);

const CubeDisplay = dynamic(() => import("../cubeDisplay/CubeDisplay"), {
  ssr: false,
});

const RightSideBarSkeleton = () => {
  return (
    <>
      <div className="hidden md:flex md:flex-col p-2 box-content bg-base-200 w-64 justify-center items-center">
        <Loading />
      </div>
    </>
  );
};

const RightSideBar = () => {
  //  const { moduleOne } = useAppSelector((state) => state.setting);
  const containerRef = useRef<HTMLDivElement>(null);
  const { modules, moduleCount } = useAppSelector((state) => state.setting);
  const [elHeight, setElHeight] = useState<number>(
    Math.round(window.innerHeight / moduleCount)
  ); // State to hold the height of el
  // Update elHeight state on window resize
  useEffect(() => {
    if (!containerRef.current) return;
    const handleResize = () => {
      setElHeight(containerRef.current!.offsetHeight / moduleCount);
    };
    // Attach the event listener
    window.addEventListener("resize", handleResize);
    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [containerRef, moduleCount]);
  const { solves, loading, error } = useSessionTypeSolves();
  const moduleIndices = Array.from(
    { length: moduleCount },
    (_, index) => index
  );
  if (loading) return <RightSideBarSkeleton />;
  if (error) return <div>Error</div>;
  return (
    <div
      className="hidden md:flex md:flex-col p-2 box-content bg-base-200 w-64"
      ref={containerRef}>
      {moduleIndices.map((i) => {
        return (
          <div
            key={i}
            className={clsx(
              "h-full relative group my-2 rounded-lg",
              modules[i] === "solves" && "overflow-y-auto"
            )}>
            {(() => {
              if (
                modules[i] !== "cubeDisplay" &&
                modules[i] !== "stats" &&
                solves.length <= 0
              )
                return <NoSolves />;
              switch (modules[i]) {
                case "timeGraph":
                  return <SolvesOverTime elHeight={elHeight} solves={solves} />;
                case "stats":
                  return <StatsModule solves={solves} />;
                case "solves":
                  return (
                    <div className="h-full overflow-y-auto">
                      <SolveTableMemoized solves={solves} />
                    </div>
                  );
                case "cubeDisplay":
                  return <CubeDisplay elHeight={elHeight} />;
                default:
                  return null;
              }
            })()}
            <div className="top-0 left-0 z-50 absolute opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <ModuleSelect moduleNumber={i} />
            </div>
          </div>
        );
      })}
    </div>
    // </Suspense>
  );
};

export default RightSideBar;
{
  /* <StatsContainer solves={solveData} /> */
}
