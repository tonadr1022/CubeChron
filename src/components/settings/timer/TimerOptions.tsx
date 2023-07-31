import React from "react";
import SettingRow from "../SettingRow";
import ModuleCountSelect from "@/components/optionsBar/ModuleCountSelect";

const TimerOptions = () => {
  return (
    <>
      <SettingRow
        title="Number of Modules"
        description="Change the number of modules displayed on the timer screen">
        <ModuleCountSelect />
      </SettingRow>
    </>
  );
};

export default TimerOptions;
