// import { PayloadAction, createSlice } from "@reduxjs/toolkit";
// import { RootState } from "../store";

// interface UserState {
//   userId: string | undefined; // Replace `string` with the appropriate type for the user ID
// }

// const initialState: UserState = {
//   userId: undefined,
// };

// export const userSlice = createSlice({
//   name: "user",
//   initialState,
//   reducers: {
//     setUser: (state, action: PayloadAction<string>) => {
//       state.userId = action.payload;
//     },
//   },
// });

// export const { setUser } = userSlice.actions;

// export default userSlice.reducer;

// // Create a selector that returns the user ID from the state with a non-null assertion
// export const selectUser = (state: RootState): string => state.user.userId!;
