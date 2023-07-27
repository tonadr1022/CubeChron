import { combineReducers, configureStore } from "@reduxjs/toolkit";
import scrambleSlice from "./slices/scrambleSlice";
import timerSlice from "./slices/timerSlice";
import userSlice from "./slices/userSlice";

import thunk from "redux-thunk";

const rootReducer = combineReducers({
  scramble: scrambleSlice,
  timer: timerSlice,
  user: userSlice,
});

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    devTools: true,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
  });
};

export const store = makeStore();

export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type
export type AppDispatch = typeof store.dispatch;
