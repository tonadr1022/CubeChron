import { CubeSessionFragment } from "@/__generated__/graphql";
import {
  PayloadAction,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import { RootState } from "../store";

const sessionsAdapter = createEntityAdapter<CubeSessionFragment>({
  selectId: (session) => session.id,
});

const INITIAL_SESSION_ID = "initial";
const INITIAL_TIME = Date.now();

const sessionsSlice = createSlice({
  name: "cubeSessions",
  initialState: sessionsAdapter.getInitialState({
    ids: [INITIAL_SESSION_ID],
    entities: {
      [INITIAL_SESSION_ID]: {
        name: "DefaultLocal",
        id: INITIAL_SESSION_ID,
        createdAt: INITIAL_TIME,
        cubeType: "333",
        notes: null,
      },
    },
  }),

  reducers: {
    addSession: {
      reducer: (state, action: PayloadAction<CubeSessionFragment>) => {
        sessionsAdapter.addOne(state, action);
      },
      prepare: (name: string, cubeType: string, notes: string) => ({
        payload: {
          id: nanoid(),
          name,
          cubeType,
          createdAt: Date.now(),
          notes,
        },
      }),
    },
    removeSession: (state, action) => sessionsAdapter.removeOne(state, action),
    updateSession: (state, action) => sessionsAdapter.updateOne(state, action),
  },
});

export const {
  selectById: selectSessionById,
  selectIds: selectSessionsByIds,
  selectAll: selectAllSessions,
} = sessionsAdapter.getSelectors<RootState>((state) => state.cubeSessions);

export const { addSession, removeSession, updateSession } =
  sessionsSlice.actions;

export default sessionsSlice.reducer;
