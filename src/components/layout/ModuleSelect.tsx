import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { setModules } from "@/redux/slices/settingSlice";
import React from "react";
import { MODULE_OPTIONS } from "@/constants/constants";
import { handleDropdownOptionClick } from "@/utils/handleDropdownOptionClick";

type Props = {
  moduleNumber: number;
};

const moduleMap = {
  0: "moduleOne",
  1: "moduleTwo",
  2: "moduleThree",
  3: "moduleFour",
  4: "moduleFive",
};

const ModuleSelect = ({ moduleNumber }: Props) => {
  const dispatch = useAppDispatch();
  const { modules } = useAppSelector((state) => state.setting);
  const handleModuleSelect = (module: string) => {
    const newModules = modules.map((m, i) => {
      if (i === moduleNumber) {
        return module;
      }
      return m;
    });
    dispatch(setModules(newModules));
    handleDropdownOptionClick();
  };

  return (
    <div className="dropdown">
      <div
        tabIndex={0}
        className="m-1 btn btn-xs bg-primary text-neutral-50 hover:bg-primary-focus">
        {modules[moduleNumber]}
      </div>
      <ul
        tabIndex={0}
        className="p-0 menu dropdown-content border-base-300 border-2 bg-base-100 rounded-box w-40 max-h-64 overflow-y-auto block">
        {Object.entries(MODULE_OPTIONS).map(([key, value]) => (
          <li
            value={key}
            key={key}
            onClick={() => handleModuleSelect(key)}
            className="hover:bg-base-300">
            <a>{value}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ModuleSelect;
