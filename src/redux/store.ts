import { combineReducers, configureStore } from "@reduxjs/toolkit";
import scrambleSlice from "./slices/scrambleSlice";
import timerSlice from "./slices/timerSlice";
// import userSlice from "./slices/userSlice";
import settingSlice from "./slices/settingSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

export const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  scramble: scrambleSlice,
  timer: timerSlice,
  setting: settingSlice,
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
