import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface UserState {
  isAuth: boolean; // Replace `string` with the appropriate type for the user ID
}
const initialState: UserState = {
  isAuth: false,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
  },
});

export const { setIsAuth } = userSlice.actions;

export default userSlice.reducer;
