import SolveTableRow from "./SolveTableRow";
import { useCallback } from "react";
import { SolveFragment } from "@/__generated__/graphql";
import { useDeleteSolve } from "@/hooks/solves/useDeleteSolve";
import { useUpdateSolve } from "@/hooks/solves/useCreateSolve";
import NoSolves from "../common/NoSolves";

type Props = { solves: SolveFragment[] };

const SolveTable = ({ solves }: Props) => {
  const deleteSolve = useDeleteSolve();
  const updateSolve = useUpdateSolve();
  const onSolveDelete = useCallback(
    (solveId: string) => {
      deleteSolve(solveId);
    },
    [deleteSolve]
  );
  const onTogglePlusTwo = useCallback(
    (solve: SolveFragment) => {
      updateSolve(solve, { id: solve.id, plusTwo: !solve.plusTwo });
    },
    [updateSolve]
  );
  const onToggleDnf = useCallback(
    (solve: SolveFragment) => {
      updateSolve(solve, { id: solve.id, dnf: !solve.dnf });
    },
    [updateSolve]
  );
  const length = solves.length ? solves?.length : 0;
  const counts = Array.from(Array(length).keys(), (i) => length - i);
  return solves.length ? (
    <div className="w-full p-2 flex flex-col bg-base-300 rounded-lg">
      {solves.map((solve, i) => (
        <SolveTableRow
          key={i}
          solveCount={counts[i]}
          onDelete={onSolveDelete}
          solve={solve}
          onTogglePlusTwo={onTogglePlusTwo}
          onToggleDnf={onToggleDnf}
        />
      ))}
    </div>
  ) : (
    <NoSolves />
  );
};

export default SolveTable;
