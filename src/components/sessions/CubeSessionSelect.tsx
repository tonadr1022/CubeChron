import {
  CubeSessionsDocument,
  SettingQueryDocument,
} from "@/__generated__/graphql";
import { useUpdateSetting } from "@/hooks/settings/useUpdateSetting";
import { useQuery } from "@apollo/client";
import clsx from "clsx";
import React, { useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";
import Modal from "../common/Modal";
import CreateCubeSessionForm from "./CreateCubeSessionForm";
import { handleDropdownOptionClick } from "@/utils/handleDropdownOptionClick";

const CubeSessionSelect = () => {
  const [open, setOpen] = useState(false);
  const { data, loading } = useQuery(CubeSessionsDocument);
  const { data: setting, loading: loading2 } = useQuery(SettingQueryDocument);
  const updateSetting = useUpdateSetting();
  if (loading || loading2) return <div>loading</div>;
  const { cubeSessions } = data!;
  const { cubeSessionId } = setting?.setting!;
  const handleClick = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    if (e.currentTarget.getAttribute("value") === "add") {
      setOpen(true);
    }
    handleDropdownOptionClick();
  };
  const handleSettingUpdate = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    handleClick(e);
    const value = e.currentTarget.getAttribute("value");
    updateSetting(setting!, {
      cubeSessionId: value!,
      id: setting!.setting.id,
    });
  };
  const active = cubeSessions.find((session) => session.id === cubeSessionId);
  return (
    <>
      <div className={clsx("dropdown dropdown-end ")}>
        <div
          tabIndex={0}
          className="m-1 btn btn-xs bg-base-300"
          // onClick={() => setOpen((prev) => !prev)}>
        >
          {active?.name}
        </div>
        {/* {visible && ( */}
        <ul
          tabIndex={0}
          className={clsx(
            "p-2 shadow menu dropdown-content bg-base-100 rounded-box w-40 max-h-64 overflow-y-auto block"
          )}>
          {cubeSessions.map((session) => (
            <li
              value={session.id}
              key={session.id}
              onClick={handleSettingUpdate}>
              <button className="hover:bg-base-300">{session.name}</button>
            </li>
          ))}
          <li value={"add"} onClick={handleClick}>
            <p className="hover:bg-base-300">Add Session</p>
          </li>
        </ul>
      </div>{" "}
      <Modal open={open} onClose={() => setOpen(false)}>
        <CreateCubeSessionForm />
      </Modal>
    </>
  );
};

export default CubeSessionSelect;
