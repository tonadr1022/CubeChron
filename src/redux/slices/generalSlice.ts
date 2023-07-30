import { useAppSelector } from "@/hooks/reduxHooks";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
export type RightBarViewOptions = "bottom" | "right" | "left";
export interface GeneralState {
  navCollapsed: boolean;
  rightBarView: RightBarViewOptions;
  focusMode: boolean;
}

const initialState: GeneralState = {
  navCollapsed: false,
  rightBarView: "bottom",
  focusMode: false,
};

const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    setNavCollapsed: (state, action: PayloadAction<boolean>) => {
      state.navCollapsed = action.payload;
    },
    setRightBarView: (state, action: PayloadAction<RightBarViewOptions>) => {
      state.rightBarView = action.payload;
    },
    setFocusMode: (state, action: PayloadAction<boolean>) => {
      state.focusMode = action.payload;
    },
  },
});

export const { setNavCollapsed, setRightBarView, setFocusMode } =
  generalSlice.actions;

export default generalSlice.reducer;
