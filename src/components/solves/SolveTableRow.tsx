import { formatTime } from "../../utils/formatTime";
import Button from "./SolveTableButton";
import clsx from "clsx";
import { Solve, SolveTable_SolveFragment } from "@/__generated__/graphql";

interface Props {
  solve: SolveTable_SolveFragment;
  onTogglePlusTwo: (solve: SolveTable_SolveFragment) => void;
  onToggleDnf: (solve: SolveTable_SolveFragment) => void;
  onDelete: (solveId: string) => void;
  solveCount: number;
}

const SolveTableRow = ({
  solve,
  onTogglePlusTwo,
  onToggleDnf,
  onDelete,
  solveCount,
}: Props) => {
  //   const record = useAppSelector((state) => selectRecordById(state, recordId));
  const color = solve.dnf ? `red` : solve.plusTwo ? "orange" : "green";
  return (
    solve && (
      <div className="w-full flex flex-row py-2" key={solve.id}>
        <div className="px-4 w-4 font-bold  flex items-center">
          {solveCount}.
        </div>
        <div
          className={clsx(
            "px-4 flex-1 font-medium transition flex items-center",
            `text-${color}-500`
          )}>
          {formatTime(solve.duration, 3)}
        </div>
        <div className="flex flex-row">
          <div>
            <Button
              className={clsx("h-8 px-2 mx-1", "bg-plus2")}
              onClick={() => onTogglePlusTwo(solve)}>
              +2
            </Button>
          </div>
          <div>
            <Button
              className={clsx("h-8 px-2 mx-1")}
              onClick={() => onDelete(solve.id)}>
              del
            </Button>
          </div>
          <div>{solve.plusTwo && "d"}</div>
          <div>
            <Button
              className={clsx("h-8 px-2 mx-1", "bg-dnf")}
              onClick={() => onToggleDnf(solve)}>
              DNF
            </Button>
          </div>
        </div>
      </div>
    )
  );
};

export default SolveTableRow;
