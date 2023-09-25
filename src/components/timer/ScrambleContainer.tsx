import { getScramble } from "@/utils/getScramble";
import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/hooks/reduxHooks";
import { setCurrentScramble } from "@/redux/slices/scrambleSlice";
import { useQuery } from "@apollo/client";
import Loading from "../common/Loading";
import { FaArrowRotateRight } from "react-icons/fa6";
import TextareaAutosize from "react-textarea-autosize";
import { SettingQueryDocument } from "@/__generated__/graphql";

const ScrambleContainer = React.memo(() => {
  const { data: setting, loading } = useQuery(SettingQueryDocument);
  const cubeType = setting?.setting.cubeType;
  const [resetScramble, setResetScramble] = React.useState(false);
  const dispatch = useAppDispatch();
  const scramble = useAppSelector((state) => state.scramble.currentScramble);

  useEffect(() => {
    if (cubeType) {
      const generateScramble = () => {
        const initialScramble = getScramble({
          cubeType,
        });
        dispatch(setCurrentScramble(initialScramble));
      };
      generateScramble();
    }
  }, [dispatch, cubeType, resetScramble]);

  if (loading) return <Loading />;
  return scramble ? (
    <>
      <TextareaAutosize
        className={"prevent-select scramble-text text-xl"}
        value={scramble}
        minRows={1}
        disabled={true}
      />
      <button
        className="btn btn-sm btn-neutral-focus p-1 m-0 rounded-full"
        onClick={() => setResetScramble(!resetScramble)}>
        <FaArrowRotateRight className="w-6 h-6" />
      </button>
    </>
  ) : (
    <Loading />
  );
});

export default ScrambleContainer;

ScrambleContainer.displayName = "ScrambleContainer";
