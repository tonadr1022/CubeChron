import React from "react";
import ThemeMenu from "./ThemeMenu";
import SettingRow from "../SettingRow";

const AppearanceOptions = () => {
  return (
    <>
      <SettingRow
        title="Theme"
        description="Change the theme of the app"
        flexRow={false}>
        <ThemeMenu />
      </SettingRow>
    </>
  );
};

export default AppearanceOptions;
