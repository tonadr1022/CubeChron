import { useState } from "react";
import CubeSessionSelect from "../sessions/CubeSessionSelect";
import CubeTypeSelect from "./CubeTypeSelect";
import ModuleViewSelect from "./ModuleViewSelect";
import ModuleCountSelect from "./ModuleCountSelect";
import FocusModeToggle from "./FocusModeToggle";
import { useAppSelector } from "@/hooks/reduxHooks";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

const OptionsBar = () => {
  const [open, setOpen] = useState(false);
  const { focusMode } = useAppSelector((state) => state.general);
  return (
    <div className="flex flex-row justify-end pt-2 pl-2">
      {!focusMode && open && (
        <>
          <CubeTypeSelect />

          {/* <div className="">
            <ModuleCountSelect />
          </div> */}
          {/* <div>
            <ModuleViewSelect />
          </div> */}
          <div className="">
            <CubeSessionSelect />
          </div>
        </>
      )}
      {open && (
        <div className="">
          <FocusModeToggle />
        </div>
      )}
      {!focusMode && (
        <button className="m-1 btn btn-xs" onClick={() => setOpen(!open)}>
          {open ? "<" : "options"}
        </button>
      )}
    </div>
  );
};

export default OptionsBar;
