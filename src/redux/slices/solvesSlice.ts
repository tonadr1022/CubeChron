import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { SolveFragment } from "@/__generated__/graphql";

const solvesAdapter = createEntityAdapter<SolveFragment>({
  selectId: (solve) => solve.id,
});

const solvesSlice = createSlice({
  name: "solves",
  initialState: solvesAdapter.getInitialState(),
  reducers: {
    addSolve: (state, action) => solvesAdapter.addOne(state, action),
    removeSolve: (state, action) => solvesAdapter.removeOne(state, action),
    updateSolve: (state, action) => solvesAdapter.updateOne(state, action),
  },
});

export const { addSolve, removeSolve, updateSolve } = solvesSlice.actions;

export const {
  selectById: selectSolveById,
  selectIds: selectSolvesByIds,
  selectAll: selectAllSolves,
} = solvesAdapter.getSelectors<RootState>((state) => state.solves);

export default solvesSlice.reducer;

// export const selectSolvesBySessionId = createSelector(
//   selectSessionById,
//   selectAllSolves,
//   (session, solves) => {
//     if (session && session.solveIds?.length) {
//       return solves.filter((solve) => session.solveIds.includes(solve.id));
//     }
//   }
// );
