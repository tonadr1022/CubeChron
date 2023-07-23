import { useAppSelector } from "@/hooks/reduxHooks";

const ScrambleDisplay = ({ scramble }: { scramble: string }) => {
  return <p className="text-2xl px-10">{scramble}</p>;
};

export default ScrambleDisplay;
