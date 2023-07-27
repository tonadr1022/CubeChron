import { useAppSelector } from "@/hooks/reduxHooks";
import React, { useEffect, useRef, useState } from "react";
import { ScrambleDisplay } from "scramble-display";
import { SettingQueryDocument } from "@/__generated__/graphql";
import { useQuery } from "@apollo/client";
import CubeDisplayToggle from "./CubeDisplayToggle";
import { Visualization } from "scramble-display/dist/types/ScrambleDisplay";
import Loading from "../common/Loading";

type Props = {
  // settingData: SettingQueryQuery;
  containerRef: React.RefObject<HTMLDivElement>;
};

const CubeDisplay = ({ containerRef }: Props) => {
  const { data: setting, loading } = useQuery(SettingQueryDocument);
  const scramble = useAppSelector((state) => state.scramble.currentScramble);
  const scrambleRef = useRef<HTMLDivElement>(null);
  const cubeType = setting?.setting?.cubeType;
  const cubeDisplayDimension = setting?.setting?.cubeDisplayDimension;
  const [elHeight, setElHeight] = useState<number | null>(null); // State to hold the height of el

  // Update elHeight state on window resize
  useEffect(() => {
    const parentContainer = containerRef.current;
    if (!parentContainer) return;
    const handleResize = () => {
      setElHeight(parentContainer.offsetHeight * 0.3333); // Set el height to 50% of the viewport height
    };

    // Attach the event listener
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [containerRef]);

  useEffect(() => {
    if (cubeType && cubeDisplayDimension) {
      const el = new ScrambleDisplay();
      el.event = cubeType;
      el.scramble = scramble;
      el.visualization = cubeDisplayDimension as Visualization;
      el.style.width = "100%";

      el.style.height = elHeight
        ? `${elHeight}px`
        : `${Math.round(window.innerHeight * 1 * 0.3)}px`;
      scrambleRef.current?.appendChild(el);
      const newref = scrambleRef.current;
      return () => {
        newref?.removeChild(el);
      };
    }
  }, [scramble, cubeType, cubeDisplayDimension, elHeight]);
  if (loading || !containerRef.current) return <Loading />;
  return (
    <div className="relative">
      <div className="relative" ref={scrambleRef}></div>
      <div className="absolute top-1 right-2">
        <CubeDisplayToggle />
      </div>
    </div>
  );
};

export default CubeDisplay;
