import { useAppSelector } from "@/hooks/reduxHooks";

const ScrambleDisplay = ({ scramble }: { scramble: string }) => {
  return <p className="text-4xl">{scramble}</p>;
};

export default ScrambleDisplay;
