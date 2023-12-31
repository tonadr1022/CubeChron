import { PayloadAction, createSlice } from "@reduxjs/toolkit";
type TimeState = "active" | "ready" | "stalling" | "paused" | "initial";
interface TimerState {
  endTimeStamp: number | null;
  startTimeStamp: number | null;
  timerState: TimeState;
  timerTimeoutId: number | null;
  timerIntervalId: number | null;
  timerCanStart: boolean;
}

const initialState: TimerState = {
  endTimeStamp: null,
  startTimeStamp: null,
  timerTimeoutId: null,
  timerIntervalId: null,
  timerState: "initial",
  timerCanStart: true,
};

export const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    setTimerState: (state, action: PayloadAction<TimeState>) => {
      state.timerState = action.payload;
    },
    setTimerTimeoutId: (state, action: PayloadAction<number | null>) => {
      state.timerTimeoutId = action.payload;
    },
    setTimerTimestamp: (state, action: PayloadAction<number | null>) => {
      state.startTimeStamp = action.payload;
    },
    setTimerIntervalId: (state, action: PayloadAction<number | null>) => {
      state.timerIntervalId = action.payload;
    },
    setTimerCanStart: (state, action: PayloadAction<boolean>) => {
      state.timerCanStart = action.payload;
    },
  },
});
export const {
  setTimerState,
  setTimerTimeoutId,
  setTimerTimestamp,
  setTimerIntervalId,
  setTimerCanStart,
} = timerSlice.actions;

export default timerSlice.reducer;
