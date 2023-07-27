import { useEffect, useRef } from "react";

export const useSpaceBarUp = (callback: () => void): void => {
  const touchStarted = useRef(false);

  useEffect(() => {
    const handleInteractionEnd: EventListener = (e) => {
      if (e instanceof TouchEvent && e.type === "touchend") {
        touchStarted.current = false;
        return; // Early return, as the touch event is already handled in useSpaceBarDown
      }
      if (
        e instanceof KeyboardEvent &&
        e.code === "Space" &&
        !e.repeat &&
        !touchStarted.current
      ) {
        if (!(e instanceof TouchEvent)) e.preventDefault();
        callback();
      }
    };

    document.addEventListener("keyup", handleInteractionEnd);
    document.addEventListener("touchend", handleInteractionEnd);

    return () => {
      document.removeEventListener("keyup", handleInteractionEnd);
      document.removeEventListener("touchend", handleInteractionEnd);
    };
  }, [callback]);
};
