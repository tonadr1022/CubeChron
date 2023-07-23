"use client";
import { formatTime } from "@/utils/formatTime";
import { useAppSelector } from "@/hooks/reduxHooks";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";
interface Props {
  duration: number;
}
const DurationDisplay = ({ duration }: Props) => {
  const state = useAppSelector((state) => state.timer.timerState);
  // const color =
  //   state === "ready"
  //     ? "green-500"
  //     : state === "stalling"
  //     ? "red-500"
  //     : "white";

  const digits = state === "active" ? 1 : 2;
  return (
    <h2
      className={twMerge(
        "text-white font-mono font-semibold text-8xl w-75",
        clsx(
          state === "ready" && "text-green-500",
          state === "stalling" && "text-red-400"
        )
      )}>
      {formatTime(duration ? duration : 0, digits)}
    </h2>
  );
};

export default DurationDisplay;
