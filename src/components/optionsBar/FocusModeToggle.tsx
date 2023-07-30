import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { setFocusMode } from "@/redux/slices/generalSlice";
import React from "react";

const FocusModeToggle = () => {
  const dispatch = useAppDispatch();
  const { focusMode } = useAppSelector((state) => state.general);
  return (
    <button
      onClick={() => dispatch(setFocusMode(!focusMode))}
      className="m-1 btn btn-xs">
      {!focusMode ? "focus" : "X"}
    </button>
  );
};

export default FocusModeToggle;
