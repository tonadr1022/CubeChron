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
  //  const { moduleOne } = useAppSelector((state) => state.setting);
  const containerRef = useRef<HTMLDivElement>(null);
  const { modules, moduleCount } = useAppSelector((state) => state.setting);

  const [elHeight, setElHeight] = useState<number | null>(
    Math.round(window.innerHeight / moduleCount)
  ); // State to hold the height of el
  // Update elHeight state on window resize
  useEffect(() => {
    if (!containerRef.current) return;
    const handleResize = () => {
      setElHeight(containerRef.current!.offsetHeight / moduleCount);
    };
    // Attach the event listener
    // if (typeof window !== "undefined") {
    window.addEventListener("resize", handleResize);
    // }

    // Clean up the event listener on unmount
    return () => {
      // if (typeof window !== "undefined") {
      window.removeEventListener("resize", handleResize);
      // }
    };
  }, [containerRef, moduleCount]);
  const { solves, loading } = useSessionTypeSolves();
  // const stats = useMemo(() => calculateStats(solves), [solves]);
  // console.log(stats, solves);
  const moduleIndices = Array.from(
    { length: moduleCount },
    (_, index) => index
  );
  // map for i in range of module count instead of module indices
  return (
    <Suspense fallback={<Loading />}>
      <div
        className="hidden md:flex md:flex-col w-80 p-2 box-content bg-base-200"
        ref={containerRef}>
        {moduleIndices.map((i) => (
          <div
            key={i}
            className={clsx(
              "h-full relative group my-2 rounded-lg",
              modules[i] === "solves" && "overflow-y-auto"
            )}>
            {modules[i] === "timeGraph" && (
              <SolvesOverTime elHeight={elHeight} solves={solves} />
            )}
            {modules[i] === "stats" && <StatsModule />}
            {modules[i] === "solves" && (
              <div className="h-full overflow-y-auto">
                <SolveTableMemoized solves={solves} />
              </div>
            )}
            {modules[i] === "cubeDisplay" && (
              <CubeDisplay elHeight={elHeight} />
            )}
            <div className="top-0 left-0 z-50 absolute opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <ModuleSelect moduleNumber={i} />
            </div>
          </div>
        ))}
      </div>
    </Suspense>
  );
  // return <div>RightSideBar</div>;
};

export default RightSideBar;
{
  /* <StatsContainer solves={solveData} /> */
}
