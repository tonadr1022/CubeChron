import { SettingQueryDocument } from "@/__generated__/graphql";
import { useUpdateSetting } from "@/hooks/settings/useUpdateSetting";
import { useQuery } from "@apollo/client";
import React from "react";

type Props = {};

const CubeDisplayToggle = (props: Props) => {
  const updateSetting = useUpdateSetting();
  const { data: setting } = useQuery(SettingQueryDocument);
  const settingId = setting?.setting?.id!;
  const cubeSessionId = setting?.setting?.cubeSessionId!;
  const cubeType = setting?.setting?.cubeType!;

  const cubeDisplayDimension = setting?.setting?.cubeDisplayDimension!;
  const handleUpdateSetting = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    const value = e.currentTarget.getAttribute("value");
    console.log(value);
    updateSetting(setting!, { cubeDisplayDimension: value!, id: settingId });
  };
  return (
    <div className="dropdown">
      <label tabIndex={0} className="btn btn-sm">
        {cubeDisplayDimension}
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu shadow bg-base-100 rounded-box w-20">
        <li value={"2D"} onClick={(e) => handleUpdateSetting(e)}>
          2D
        </li>
        <li value={"3D"} onClick={handleUpdateSetting}>
          3D
        </li>
      </ul>
    </div>
  );
};

export default CubeDisplayToggle;
