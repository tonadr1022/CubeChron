"use client";
import { useEffect } from "react";
import { useAppSelector } from "./reduxHooks";

export const useSpaceBarDown = (callback: () => void): void => {
  const { timerCanStart } = useAppSelector((state) => state.timer);
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (timerCanStart && e.code === "Space" && !e.repeat) {
        e.preventDefault();
        callback();
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [callback, timerCanStart]);
};

// export const useSpaceBarDown = (callback: () => void): void => {
//   useEffect(() => {
//     const handleInteractionStart: EventListener = (e) => {
//       if (
//         (e instanceof KeyboardEvent && e.code === "Space" && !e.repeat) ||
//         (e instanceof TouchEvent && e.type === "touchstart")
//       ) {
//         if (!(e instanceof TouchEvent)) e.preventDefault();
//         callback();
//       }
//     };

//     document.addEventListener("keydown", handleInteractionStart);
//     document.addEventListener("touchstart", handleInteractionStart);

//     return () => {
//       document.removeEventListener("keydown", handleInteractionStart);
//       document.removeEventListener("touchstart", handleInteractionStart);
//     };
//   }, [callback]);
// };
