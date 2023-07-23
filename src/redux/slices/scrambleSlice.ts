import {
  createDraftSafeSelector,
  createSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
// import { cubeTypeMap } from "@/app/libs/constants";
import { getScramble } from "@/utils/getScramble";
// import { CubeTypeMap } from "@/app/libs/types";
interface ScrambleState {
  currentScramble: string;
  scrambleType: string;
}

const getInitialState = () => {
  return {
    currentScramble: "",
    scrambleType: "C333",
  };
};

const scrambleSlice = createSlice({
  name: "scramble",
  initialState: getInitialState(),
  reducers: {
    setCurrentScramble: (state, action: PayloadAction<string>) => {
      state.currentScramble = action.payload;
    },
    setScrambleType: (state, action: PayloadAction<string>) => {
      state.scrambleType = action.payload;
    },
  },
});

export const { setCurrentScramble, setScrambleType } = scrambleSlice.actions;

const selectSelf = (state: ScrambleState) => state;

export const selectCurrentScramble = createSelector(
  selectSelf,
  (state) => state.currentScramble
);

export const selectScrambleType = createSelector(
  selectSelf,
  (state) => state.scrambleType
);
export default scrambleSlice.reducer;
