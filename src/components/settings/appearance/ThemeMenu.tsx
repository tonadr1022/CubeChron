import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { setTheme } from "@/redux/slices/settingSlice";
import React from "react";
import ThemeMenuOption from "./ThemeMenuOption";
const options = [
  "light",
  "dark",
  "cupcake",
  "bumblebee",
  "emerald",
  "corporate",
  "synthwave",
  "retro",
  "cyberpunk",
  "valentine",
  "halloween",
  "garden",
  "forest",
  "aqua",
  "lofi",
  "pastel",
  "fantasy",
  "wireframe",
  "black",
  "luxury",
  "dracula",
  "autumn",
  "business",
  "acid",
  "lemonade",
  "night",
  "winter",
];

const ThemeMenu = () => {
  const dispatch = useAppDispatch();
  const { theme } = useAppSelector((state) => state.setting);
  const handleClick = (option: string) => {
    dispatch(setTheme(option));
  };
  return (
    <div className="grid grid-cols-4 ">
      {options.map((option) => (
        <ThemeMenuOption
          handleClick={handleClick}
          name={option}
          key={option}
          active={theme === option}
        />
      ))}
    </div>
  );
};

export default ThemeMenu;
