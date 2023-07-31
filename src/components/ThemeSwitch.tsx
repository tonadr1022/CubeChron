import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { setTheme } from "@/redux/slices/settingSlice";
import { useEffect } from "react";
import { FaRegMoon, FaRegSun } from "react-icons/fa6";

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
    <button className="btn btn-sm" onClick={toggleTheme}>
      {theme === "light" ? <FaRegMoon /> : <FaRegSun />}
    </button>
  );
};

export default ThemeSwitch;
