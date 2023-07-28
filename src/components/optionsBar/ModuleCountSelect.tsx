import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { setModuleCount } from "@/redux/slices/settingSlice";
import React from "react";

const ModuleCountSelect = () => {
  const { moduleCount } = useAppSelector((state) => state.setting);
  const dispatch = useAppDispatch();
  const handleSettingUpdate = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    const value = e.currentTarget.getAttribute("value");
    dispatch(setModuleCount(Number(value)));
  };
  const moduleCounts = [1, 2, 3, 4];
  return (
    <>
      <div className="dropdown dropdown-end ">
        <div
          tabIndex={0}
          className="m-1 btn btn-xs bg-base-300"
          // onClick={() => setOpen((prev) => !prev)}>
        >
          {moduleCount}
        </div>
        <ul
          tabIndex={0}
          className="p-2 menu  dropdown-content bg-base-100 rounded-box w-40 max-h-64 overflow-y-auto block"
          //   { hidden: !open }
        >
          {moduleCounts.map((i) => (
            <li value={i} key={i} onClick={handleSettingUpdate}>
              <a className="hover:bg-base-300">{i}</a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ModuleCountSelect;
