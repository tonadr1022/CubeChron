// import { Record } from "@/shared/types";
// import { updateRecord, removeRecord } from "@/redux/recordsSlice";
// import { useAppDispatch, useAppSelector } from "@/hooks/hooks";

// import SolveTableRow from "@/components/solves/SolveTableRow";

import { gql, useMutation, useQuery } from "@apollo/client";
import SolveTableRow from "./SolveTableRow";
import { useCallback, useMemo } from "react";
import {
  DeleteSolveDocument,
  SettingQueryDocument,
  Solve,
  SolveFragment,
  SolvesByCubeSessionDocument,
  SolvesQueryDocument,
  UpdateSolveDocument,
} from "@/__generated__/graphql";
import { useDeleteSolve } from "@/hooks/solves/useDeleteSolve";
import { useUpdateSolve } from "@/hooks/solves/useCreateSolve";
import { getCubeSessionTypeSolves } from "@/data/getCubeSessionTypeSolves";

// gql`
//   fragment SolveTable_Solve on Solve {
//     id
//     duration
//     dnf
//     plusTwo
//   }
// `;
type Props = { solves: SolveFragment[] };

const SolveTable = ({ solves }: Props) => {
  const deleteSolve = useDeleteSolve();
  const updateSolve = useUpdateSolve();
  console.log("tble");
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
  return (
    <div>
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
