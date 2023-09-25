import { CUBE_TYPE_OPTIONS } from "@/constants/constants";
import clsx from "clsx";
import React from "react";

type Props = {
  cubeType: string;
  handleCubeTypeChange: (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => void;
  setAddSessionOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
type CubeTypeSelectProps = {
  cubeType: string;
  handleCubeTypeChange: (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => void;
};

const CubeTypeSelect = ({
  cubeType,
  handleCubeTypeChange,
}: CubeTypeSelectProps) => {
  return (
    <div className="dropdown z-50">
      <div tabIndex={0} className="btn bg-primary normal-case">
        Stats for{" "}
        {CUBE_TYPE_OPTIONS[cubeType as keyof typeof CUBE_TYPE_OPTIONS]}
      </div>
      <ul
        tabIndex={0}
        className={clsx(
          "p-2 shadow menu dropdown-content bg-base-100 rounded-box w-40 max-h-64 overflow-y-auto block"
        )}>
        {Object.entries(CUBE_TYPE_OPTIONS).map(([key, value]) => (
          <li value={key} key={key} onClick={handleCubeTypeChange}>
            <button>{value}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const CubeSessionMenuBar = ({
  cubeType,
  handleCubeTypeChange,
  setAddSessionOpen,
}: Props) => {
  return (
    <div className="flex p-8 gap-4">
      <CubeTypeSelect
        cubeType={cubeType}
        handleCubeTypeChange={handleCubeTypeChange}
      />
      <button className="btn btn-primary normal-case">Edit</button>
      <button
        onClick={() => setAddSessionOpen(true)}
        className="btn btn-primary normal-case">
        Add Session
      </button>
    </div>
  );
};

export default CubeSessionMenuBar;
