import { SettingQueryDocument } from "@/__generated__/graphql";
import { useQuery } from "@apollo/client";
import React from "react";
import { CUBE_TYPE_OPTIONS } from "@/constants/constants";
import clsx from "clsx";
import { useUpdateSetting } from "@/hooks/settings/useUpdateSetting";
import { handleDropdownOptionClick } from "@/utils/handleDropdownOptionClick";
import Loading from "../common/Loading";

const CubeTypeSelect = () => {
  const updateSetting = useUpdateSetting();
  const { data: setting, loading: loading } = useQuery(SettingQueryDocument);
  if (loading) return <Loading />;
  const cubeType = setting?.setting.cubeType!;
  const handleSettingUpdate = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    handleDropdownOptionClick();
    const value = e.currentTarget.getAttribute("value");
    updateSetting(setting!, {
      cubeType: value!,
      id: setting!.setting.id,
    });
  };

  return (
    <>
      <div className="dropdown dropdown-end ">
        <div
          tabIndex={0}
          className="m-1 btn btn-xs bg-base-300"
          // onClick={() => setOpen((prev) => !prev)}>
        >
          {CUBE_TYPE_OPTIONS[cubeType as keyof typeof CUBE_TYPE_OPTIONS]}
        </div>
        <ul
          tabIndex={0}
          className={clsx(
            "p-2 shadow menu dropdown-content bg-base-100 rounded-box w-40 max-h-64 overflow-y-auto block"
            //   { hidden: !open }
          )}>
          {Object.entries(CUBE_TYPE_OPTIONS).map(([key, value]) => (
            <li value={key} key={key} onClick={handleSettingUpdate}>
              <a className="hover:bg-base-300">{value}</a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default CubeTypeSelect;
