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
  elHeight: number | null;
  // containerRef: React.RefObject<HTMLDivElement>;
};

const CubeDisplay = ({ elHeight }: Props) => {
  const { data: setting, loading } = useQuery(SettingQueryDocument);
  const scramble = useAppSelector((state) => state.scramble.currentScramble);
  const scrambleRef = useRef<HTMLDivElement>(null);
  const cubeType = setting?.setting?.cubeType;
  const cubeDisplayDimension = useAppSelector(
    (state) => state.cubeSetting.cubeDisplayDimension
  );
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
  // if (loading) return <Loading />;
  return (
    <div className="relative">
      <div ref={scrambleRef}></div>
      <div className="absolute top-1 right-2">
        <CubeDisplayToggle />
      </div>
    </div>
  );
};

export default CubeDisplay;
