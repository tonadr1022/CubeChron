import { formatTime } from "@/utils/formatTime";
import { useAppSelector } from "@/hooks/reduxHooks";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";
interface Props {
  duration: number;
}
const DurationDisplay = ({ duration }: Props) => {
  const state = useAppSelector((state) => state.timer.timerState);
  const digits = state === "active" ? 1 : 2;
  return (
    <h2
      className={twMerge(
        clsx(
          state === "ready" && "text-success",
          state === "stalling" && "text-warning"
        ),
        "text-6xl font-mono font-semibold w-75 "
      )}>
      {formatTime(duration ? duration : 0, digits)}
    </h2>
  );
};

export default DurationDisplay;
