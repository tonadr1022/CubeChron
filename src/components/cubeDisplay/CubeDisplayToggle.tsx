import {
  SettingQueryDocument,
  SettingQueryQuery,
} from "@/__generated__/graphql";
import { useUpdateSetting } from "@/hooks/settings/useUpdateSetting";
import { useQuery } from "@apollo/client";
import React from "react";

const options = ["2D", "3D"];
const CubeDisplayToggle = () => {
  const { data: settingData, loading: loading } =
    useQuery(SettingQueryDocument);
  const updateSetting = useUpdateSetting();
  if (loading) return <div>loading</div>;

  const { cubeDisplayDimension } = settingData!.setting;

  const handleUpdateSetting = (e: {
    currentTarget: { getAttribute: (arg0: string) => any };
  }) => {
    const value = e.currentTarget.getAttribute("value");
    console.log(value);
    updateSetting(settingData!, {
      cubeDisplayDimension: value!,
      id: settingData!.setting.id,
    });
  };
  return (
    <div className="join text-center my-1">
      {options.map((option) => (
        <input
          key={option}
          type="radio"
          name="options"
          data-title={option}
          className="join-item btn btn-xs"
          value={option}
          aria-label={option}
          checked={cubeDisplayDimension === option}
          onChange={(e) => handleUpdateSetting(e)}
        />
      ))}
    </div>
  );
};

export default CubeDisplayToggle;
