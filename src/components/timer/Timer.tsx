import { useCallback, useMemo, useState } from "react";
import { useSpaceBarDown } from "@/hooks/useSpaceBarDown";
import { useSpaceBarUp } from "@/hooks/useSpaceBarUp";
import { getScramble } from "@/utils/getScramble";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { setCurrentScramble } from "@/redux/slices/scrambleSlice";
import {
  setTimerState,
  setTimerTimeoutId,
  setTimerIntervalId,
} from "@/redux/slices/timerSlice";
import { useLazyQuery, useQuery } from "@apollo/client";
import DurationDisplay from "./DurationDisplay";

import { nanoid } from "@reduxjs/toolkit";
import {
  CreateSolveInput,
  SettingQueryDocument,
} from "@/__generated__/graphql";
import { useCreateSolve } from "@/hooks/solves/useCreateSolve";
import { useSession } from "next-auth/react";
import { addSolve } from "@/redux/slices/solvesSlice";
import { useGetSetting } from "@/hooks/settings/useGetSetting";

const Timer = () => {
  const { isAuth } = useAppSelector((state) => state.user);
  const { timerState, timerTimeoutId, timerIntervalId } = useAppSelector(
    (state) => state.timer
  );
  const setting = useGetSetting();
  const cubeSessionId = setting?.cubeSessionId!;
  const cubeType = setting?.cubeType!;

  const { currentScramble } = useAppSelector((state) => state.scramble);
  const dispatch = useAppDispatch();
  const [duration, setDuration] = useState<number>(0);
  const createSolve = useCreateSolve();

  const updateTimer = (start: number) => {
    const id = setInterval(() => {
      setDuration((Date.now() - start) / 1000);
    }, 10) as unknown as number;
    dispatch(setTimerIntervalId(id));
  };

  const handleKeyDown = () => {
    if (timerState === "active") {
      // solve was active and now finished
      if (timerTimeoutId) clearTimeout(timerTimeoutId);
      if (timerIntervalId) clearInterval(timerIntervalId);
      const input: CreateSolveInput = {
        id: nanoid(),
        cubeType,
        cubeSessionId,
        duration,
        dnf: false,
        plusTwo: false,
        scramble: currentScramble,
      };
      if (isAuth) {
        createSolve(input);
      } else {
        dispatch(addSolve({ ...input, createdAt: new Date().toISOString() }));
      }

      dispatch(setTimerState("stalling"));
      dispatch(setCurrentScramble(getScramble({ cubeType })));
    } else if (timerState === "initial" || timerState === "paused") {
      // timer at 0, ready to turn red before starting
      setDuration(0);
      dispatch(setTimerState("stalling"));
      dispatch(
        setTimerTimeoutId(
          setTimeout(() => {
            dispatch(setTimerState("ready"));
          }, 300) as unknown as number
        )
      );
    }
  };

  const handleKeyUp = () => {
    if (timerTimeoutId) {
      clearTimeout(timerTimeoutId);
      dispatch(setTimerTimeoutId(null));
    }
    if (timerState === "ready") {
      dispatch(setTimerState("active"));
      const start = Date.now();
      updateTimer(start);
    } else {
      dispatch(setTimerState("initial"));
    }
  };

  useSpaceBarDown(handleKeyDown);

  useSpaceBarUp(handleKeyUp);

  return (
    <>
      {/* <div>{cubeType}</div> */}
      <DurationDisplay duration={duration} />
    </>
  );
};

export default Timer;
