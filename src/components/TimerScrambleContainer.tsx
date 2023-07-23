"use client";
import React from "react";
import Scramble from "./ScrambleContainer";
import Timer from "./Timer";
import { useSession } from "next-auth/react";

type Props = {};

const TimerScrambleContainer = () => {
  return (
    <div className="flex flex-col justify-center align-middle text-center">
      <Scramble />
      <Timer />
    </div>
  );
};

export default TimerScrambleContainer;
