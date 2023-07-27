"use client";
import { useEffect, useRef } from "react";

// export const useSpaceBarDown = (callback: () => void): void => {
//   useEffect(() => {
//     const handleKeyDown = (e: KeyboardEvent) => {
//       if (e.code === "Space" && !e.repeat) {
//         e.preventDefault();
//         callback();
//       }
//     };
//     document.addEventListener("keydown", handleKeyDown);

//     return () => {
//       document.removeEventListener("keydown", handleKeyDown);
//     };
//   }, [callback]);
// };
export const useSpaceBarDown = (callback: () => void): void => {
  useEffect(() => {
    const handleInteractionStart: EventListener = (e) => {
      if (
        (e instanceof KeyboardEvent && e.code === "Space" && !e.repeat) ||
        (e instanceof TouchEvent && e.type === "touchstart")
      ) {
        if (!(e instanceof TouchEvent)) e.preventDefault();
        callback();
      }
    };

    document.addEventListener("keydown", handleInteractionStart);
    document.addEventListener("touchstart", handleInteractionStart);

    return () => {
      document.removeEventListener("keydown", handleInteractionStart);
      document.removeEventListener("touchstart", handleInteractionStart);
    };
  }, [callback]);
};
