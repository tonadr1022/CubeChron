import { useEffect } from "react";
import { useAppSelector } from "./reduxHooks";

export const useTheme = () => {
  const theme = useAppSelector((state) => state.setting.theme);
  useEffect(() => {
    document.querySelector("html")!.setAttribute("data-theme", theme);
  }, [theme]);
};
