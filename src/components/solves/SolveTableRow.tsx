import { formatTime } from "../../utils/formatTime";
import Button from "./SolveTableButton";
import clsx from "clsx";
import { Solve, SolveFragment } from "@/__generated__/graphql";
import { FaTrash } from "react-icons/fa6";
interface Props {
  solve: SolveFragment;
  onTogglePlusTwo: (solve: SolveFragment) => void;
  onToggleDnf: (solve: SolveFragment) => void;
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
  if (solveCount === 77) {
    console.log(solveCount, solve.duration, solve.dnf, solve.plusTwo);
  }
  //   const record = useAppSelector((state) => selectRecordById(state, recordId));
  return (
    solve && (
      <div className="w-full flex flex-row pb-1 items-center" key={solve.id}>
        <div className=" pl-4 pr-8 w-6 font-bold flex items-center">
          {solveCount}.
        </div>
        <div
          className={clsx(
            "px-4 flex-1 font-medium transition flex items-center", // Remove the comma here
            solve.dnf
              ? "text-error"
              : solve.plusTwo
              ? "text-warning"
              : "text-success"
            // solve.plusTwo && "text-warning"
          )}>
          {formatTime(solve.duration, 3)}
        </div>
        <div className="flex flex-row">
          <div>
            <button
              className={clsx(
                "btn btn-xs bg-base-300 border-none hover:bg-base-100 transition-none",
                solve.plusTwo && "bg-warning text-neutral"
              )}
              onClick={() => onTogglePlusTwo(solve)}>
              +2
            </button>
          </div>
          <div>
            <button
              className={clsx(
                "btn btn-xs bg-base-300 border-none hover:bg-base-100 transition-none"
              )}
              onClick={() => onDelete(solve.id)}>
              <FaTrash />
            </button>
          </div>
          <div>
            <button
              className={clsx(
                "btn btn-xs bg-base-300 border-none hover:bg-base-100",
                solve.dnf && "bg-error text-neutral"
              )}
              onClick={() => onToggleDnf(solve)}>
              DNF
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default SolveTableRow;
