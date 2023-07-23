import { useState } from "react";
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
import { gql, useApolloClient, useMutation, useQuery } from "@apollo/client";
import DurationDisplay from "./DurationDisplay";
import { Setting } from "@prisma/client";
import { nanoid } from "@reduxjs/toolkit";
import { redirect } from "next/navigation";
import { selectUser } from "@/redux/slices/userSlice";
import {
  CreateSolveDocument,
  CreateSolveInput,
  SettingQueryDocument,
  SolvesQueryDocument,
} from "@/__generated__/graphql";

const Timer = () => {
  const userId = useAppSelector(selectUser);

  const { timerState, timerTimeoutId, timerIntervalId } = useAppSelector(
    (state) => state.timer
  );
  const { data, loading, error } = useQuery(SettingQueryDocument);
  const cubeSessionId = data?.setting?.cubeSessionId!;
  const cubeType = data?.setting?.cubeType!;

  const { currentScramble, scrambleType } = useAppSelector(
    (state) => state.scramble
  );
  const dispatch = useAppDispatch();

  const [duration, setDuration] = useState<number>(0);
  const [createSolve] = useMutation(CreateSolveDocument, {
    refetchQueries: [{ query: SolvesQueryDocument }],
  });
  const updateTimer = (start: number) => {
    const id = setInterval(() => {
      setDuration(Date.now() - start);
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
      createSolve({
        variables: { input },
        optimisticResponse(vars) {
          return {
            __typename: "Mutation",
            createSolve: {
              __typename: "Solve",
              ...input,
              notes: null,
              createdAt: new Date().toISOString(),
            },
          };
        },
      });
      dispatch(setTimerState("stalling"));
      dispatch(
        setCurrentScramble(
          getScramble({
            scrambleType: scrambleType,
          })
        )
      );
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

  useSpaceBarDown(() => {
    handleKeyDown();
  });

  useSpaceBarUp(() => {
    handleKeyUp();
  });

  return (
    <>
      {/* <div>{cubeType}</div> */}
      <DurationDisplay duration={duration} />
    </>
  );
};

export default Timer;
