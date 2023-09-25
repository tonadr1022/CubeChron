import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { setCubeDisplayDimension } from "@/redux/slices/cubeSettingSlice";
import React from "react";

const options = ["2D", "3D"];
const CubeDisplayToggle = () => {
  // const { data: settingData, loading: loading } =
  //   useQuery(SettingQueryDocument);
  const dispatch = useAppDispatch();

  // const updateSetting = useUpdateSetting();
  // if (loading) return <div>loading</div>;
  const { cubeDisplayDimension } = useAppSelector((state) => state.cubeSetting);
  // const { cubeDisplayDimension } = settingData!.setting;
  const handleUpdateSetting = (e: {
    currentTarget: { getAttribute: (arg0: string) => any };
  }) => {
    const value = e.currentTarget.getAttribute("value");
    // console.log(value);
    dispatch(setCubeDisplayDimension(value));
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
