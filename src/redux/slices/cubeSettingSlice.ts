import { PayloadAction, createSlice } from "@reduxjs/toolkit";
type CubeDisplayDimensionType = "2D" | "3D";
export interface SettingState {
  cubeType: string;
  cubeDisplayDimension: CubeDisplayDimensionType;
  cubeSessionId: string;
}

const initialState: SettingState = {
  cubeType: "333",
  cubeDisplayDimension: "2D",
  cubeSessionId: "initial",
};
const cubeSettingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    setCubeType: (state, action: PayloadAction<string>) => {
      state.cubeType = action.payload;
    },
    setCubeDisplayDimension: (
      state,
      action: PayloadAction<CubeDisplayDimensionType>
    ) => {
      state.cubeDisplayDimension = action.payload;
    },

    setCubeSessionId: (state, action: PayloadAction<string>) => {
      state.cubeSessionId = action.payload;
    },
  },
});

export const { setCubeDisplayDimension, setCubeSessionId, setCubeType } =
  cubeSettingSlice.actions;

export default cubeSettingSlice.reducer;
