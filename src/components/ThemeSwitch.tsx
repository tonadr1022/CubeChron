import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { setTheme } from "@/redux/slices/settingSlice";
import { useEffect } from "react";

const ThemeSwitch = () => {
  const theme = useAppSelector((state) => state.setting.theme);
  const dispatch = useAppDispatch();

  const toggleTheme = () => {
    dispatch(setTheme(theme === "dark" ? "light" : "dark"));
  };
  // initially set the theme and "listen" for changes to apply them to the HTML tag
  useEffect(() => {
    document.querySelector("html")!.setAttribute("data-theme", theme);
  }, [theme]);
  return (
    <label className="swap swap-rotate">
      <input onClick={toggleTheme} type="checkbox" />
      <div className="swap-on">DARKMODE</div>
      <div className="swap-off">LIGHTMODE</div>
    </label>
  );
};

export default ThemeSwitch;
