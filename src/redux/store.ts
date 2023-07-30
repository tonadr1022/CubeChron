import { combineReducers, configureStore } from "@reduxjs/toolkit";
import scrambleSlice from "./slices/scrambleSlice";
import timerSlice from "./slices/timerSlice";
// import userSlice from "./slices/userSlice";
import settingSlice from "./slices/settingSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import solvesSlice from "./slices/solvesSlice";
import cubeSessionSlice from "./slices/cubeSessionSlice";
import userSlice from "./slices/userSlice";
import generalSlice from "./slices/generalSlice";
import cubeSettingSlice from "./slices/cubeSettingSlice";

export const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  scramble: scrambleSlice,
  timer: timerSlice,
  setting: settingSlice,
  solves: solvesSlice,
  cubeSessions: cubeSessionSlice,
  cubeSetting: cubeSettingSlice,
  user: userSlice,
  general: generalSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type
export type AppDispatch = typeof store.dispatch;
