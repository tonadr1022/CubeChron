"use client";
import React from "react";
import Scramble from "./ScrambleContainer";
import Timer from "./Timer";

type Props = {};

const TimerScrambleContainer = () => {
  return (
    <div className="flex flex-col justify-center items-center text-center flex-1">
      <Scramble />
      <Timer />
    </div>
  );
};

export default TimerScrambleContainer;
