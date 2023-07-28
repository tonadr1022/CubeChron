import React, { useRef, Suspense, useState, useEffect } from "react";
import SolveTable from "../solves/SolveTable";
import Loading from "../common/Loading";
import ModuleSelect from "./ModuleSelect";
import { useSessionTypeSolves } from "@/hooks/solves/useSessionTypeSolves";
import { useAppSelector } from "@/hooks/reduxHooks";
import dynamic from "next/dynamic";
import SolvesOverTime from "../graphs/SolvesOverTime";
import StatsModule from "../stats/StatsModule";
const SolveTableMemoized = React.memo(SolveTable);
const CubeDisplay = dynamic(() => import("../cubeDisplay/CubeDisplay"), {
  ssr: false,
});
const BottomBar = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { solves } = useSessionTypeSolves();
  const { modules } = useAppSelector((state) => state.setting);
  const [elHeight, setElHeight] = useState<number | null>(
    Math.round(window.innerHeight * 0.3)
  );
  // Update elHeight state on window resize
  useEffect(() => {
    if (!containerRef.current) return;
    const handleResize = () => {
      setElHeight(containerRef.current!.offsetHeight); // Set el height to 50% of the viewport height
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
  }, [containerRef]);

  return (
    <Suspense fallback={<Loading />}>
      <div
        className="group w-full p-2 bg-base-200 rounded-xl flex flex-col overflow-y-auto h-[30vh] relative "
        ref={containerRef}>
        <div className="relative h-full">
          {modules[0] === "solves" && <SolveTableMemoized solves={solves} />}
          {modules[0] === "cubeDisplay" && (
            <CubeDisplay elHeight={elHeight && elHeight * 0.95} />
          )}

          {modules[0] === "timeGraph" && elHeight && (
            <SolvesOverTime elHeight={elHeight * 0.9} solves={solves} />
          )}

          {modules[0] === "stats" && <StatsModule />}

          <div className="top-0 left-0 z-50 absolute opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <ModuleSelect moduleNumber={0} />
          </div>
        </div>
      </div>
    </Suspense>
  );
};
export default BottomBar;
