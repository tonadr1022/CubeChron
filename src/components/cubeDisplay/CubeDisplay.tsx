import { useAppSelector } from "@/hooks/reduxHooks";
import React, { useEffect, useRef } from "react";
import { ScrambleDisplay } from "scramble-display";

const CubeDisplay = () => {
  const scramble = useAppSelector((state) => state.scramble.currentScramble);
  const scrambleType = useAppSelector((state) => state.scramble.scrambleType);
  const scrambleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = new ScrambleDisplay();
    el.event = scrambleType || "pyram"; // Set a default event if not provided
    el.scramble = scramble || "B U' L U' L B' U' L' l' r u'"; // Set a default scramble if not provided
    el.visualization = "3D";
    scrambleRef.current?.appendChild(el);
    const newref = scrambleRef.current;
    // Clean up the ScrambleDisplay instance on unmount
    return () => {
      newref?.removeChild(el);
    };
  }, [scramble, scrambleType]);

  return <div ref={scrambleRef}></div>;
};

export default CubeDisplay;
