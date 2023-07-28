import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface SettingState {
  modules: string[];
  barView: string;
  theme: string;
  moduleCount: number;
}

const initialState: SettingState = {
  modules: ["solves", "stats", "cubeDisplay", "timeGraph", "none"],
  barView: "side",
  theme: "dark",
  moduleCount: 3,
};
const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    setModules: (state, action: PayloadAction<string[]>) => {
      state.modules = action.payload;
    },
    setBarView: (state, action: PayloadAction<string>) => {
      state.barView = action.payload;
    },
    setTheme: (state, action: PayloadAction<string>) => {
      state.theme = action.payload;
    },
    setModuleCount: (state, action: PayloadAction<number>) => {
      state.moduleCount = action.payload;
    },
  },
});

export const { setModules, setBarView, setTheme, setModuleCount } =
  settingSlice.actions;

export default settingSlice.reducer;
