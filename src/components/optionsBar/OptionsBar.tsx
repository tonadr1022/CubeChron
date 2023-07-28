import React from "react";
import ThemeSwitch from "../ThemeSwitch";
import CubeSessionSelect from "../sessions/CubeSessionSelect";
import CubeDisplayToggle from "../cubeDisplay/CubeDisplayToggle";
import { SettingQueryQuery } from "@/__generated__/graphql";
import CubeTypeSelect from "./CubeTypeSelect";
import ModuleViewSelect from "./ModuleViewSelect";
import ModuleCountSelect from "./ModuleCountSelect";

const OptionsBar = () => {
  return (
    <div className="flex flex-row">
      <div className="flex-1">
        <ThemeSwitch />
      </div>
      <div className="mx3">
        <CubeTypeSelect />
      </div>
      <div className="mx3">
        <ModuleCountSelect />
      </div>
      <div>
        <ModuleViewSelect />
      </div>
      <div className="mx3">
        <CubeSessionSelect />
      </div>
    </div>
  );
};

export default OptionsBar;
