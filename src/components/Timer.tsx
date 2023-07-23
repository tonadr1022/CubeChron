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
  // SettingDocument,
  MutationCreateSolveArgs,
} from "@/__generated__/graphql";
gql`
  query Setting($userId: String!) {
    setting(userId: $userId) {
      cubeType
      cubeSessionId
      focusMode
      id
    }
  }
`;
// gql`
//   input CreateSolveInput {
//     cubeSessionId: String
//     scramble: String
//     cubeType: String!
//     notes: String
//     dnf: Boolean
//     plusTwo: Boolean
//     duration: Float!
//     userId: String
//   }
// `;
// gql`
//   mutation CreateSolve($input: ${}) {
//     createSolve(
//       id
//       userId
//       scramble
//       plusTwo
//       notes
//       duration
//       dnf
//       cubeType
//       cubeSessionId
//     )
//   }
// `;
const Timer = () => {
  const userId = useAppSelector(selectUser);

  const { timerState, timerTimeoutId, timerIntervalId } = useAppSelector(
    (state) => state.timer
  );
  // const { data, loading, error } = useQuery(SettingDocument, {
  //   variables: { userId },
  // });
  // const cubeSessionId = data?.setting?.cubeSessionId;
  // const cubeType = data?.setting?.cubeType;

  // const { cubeSessionId, cubeType } = useAppSelector((state) => state.setting);
  // if (!cubeSessionId || !cubeType) redirect("/login");

  const { currentScramble, scrambleType } = useAppSelector(
    (state) => state.scramble
  );
  const dispatch = useAppDispatch();

  const [duration, setDuration] = useState<number>(0);
  // const [createSolve] = useMutation(CreateSolveDocument);

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
      const input: MutationCreateSolveArgs = {
        // cubeType,
        // cubeSessionId,
        duration,
        dnf: false,
        plusTwo: false,
        scramble: currentScramble,
        userId: userId,
      };
      // create solve

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
