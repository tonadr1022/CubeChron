// import { Record } from "@/shared/types";
// import { updateRecord, removeRecord } from "@/redux/recordsSlice";
// import { useAppDispatch, useAppSelector } from "@/hooks/hooks";

// import SolveTableRow from "@/components/solves/SolveTableRow";

import { gql, useMutation, useQuery } from "@apollo/client";
import SolveTableRow from "./SolveTableRow";
import { useCallback } from "react";
import {
  DeleteSolveDocument,
  SolveTable_SolveFragment,
  SolvesQueryDocument,
  UpdateSolveDocument,
} from "@/__generated__/graphql";

gql`
  fragment SolveTable_Solve on Solve {
    id
    duration
    dnf
    plusTwo
  }
`;
type Props = {
  solves: SolveTable_SolveFragment[];
};

const SolveTable: React.FC<Props> = ({ solves }: Props) => {
  const [deleteSolve] = useMutation(DeleteSolveDocument, {
    refetchQueries: [{ query: SolvesQueryDocument }],
  });
  const [updateSolve] = useMutation(UpdateSolveDocument, {
    refetchQueries: [{ query: SolvesQueryDocument }],
  });
  // const dispatch = useAppDispatch();
  const onSolveDelete = useCallback(
    (solveId: string) => {
      deleteSolve({ variables: { id: solveId } });
    },
    [deleteSolve]
  );

  const onTogglePlusTwo = useCallback(
    (solve: SolveTable_SolveFragment) => {
      updateSolve({
        variables: { id: solve.id, input: { plusTwo: !solve.plusTwo } },
      });
    },
    [updateSolve]
  );

  const onToggleDnf = useCallback(
    (solve: SolveTable_SolveFragment) => {
      updateSolve({ variables: { id: solve.id, input: { dnf: !solve.dnf } } });
    },
    [updateSolve]
  );
  const length = solves.length ? solves?.length : 0;
  const counts = Array.from(Array(length).keys(), (i) => length - i);
  return (
    <div className="w-full p-2 bg-slate-800 flex flex-col overflow-y-auto h-1/3">
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
  );
};

export default SolveTable;
