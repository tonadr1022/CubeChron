import {
  CubeSessionsDocument,
  SettingQueryDocument,
} from "@/__generated__/graphql";
import { useUpdateSetting } from "@/hooks/settings/useUpdateSetting";
import { useQuery } from "@apollo/client";
import clsx from "clsx";
import React, { useState } from "react";
import Modal from "../common/Modal";
import CreateCubeSessionForm from "./CreateCubeSessionForm";
import { handleDropdownOptionClick } from "@/utils/handleDropdownOptionClick";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { setTimerCanStart } from "@/redux/slices/timerSlice";
import Loading from "../common/Loading";

const CubeSessionSelect = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { data, loading } = useQuery(CubeSessionsDocument);
  const { data: setting, loading: loading2 } = useQuery(SettingQueryDocument);
  const updateSetting = useUpdateSetting();
  if (loading || loading2) return <Loading />;
  const { cubeSessions } = data!;
  const { cubeSessionId } = setting?.setting!;
  const handleClick = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    if (e.currentTarget.getAttribute("value") === "add") {
      dispatch(setTimerCanStart(false));
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

  const handleClose = () => {
    setOpen(false);
    dispatch(setTimerCanStart(true));
  };
  const active = cubeSessions.find((session) => session.id === cubeSessionId);
  return (
    <>
      <div className={clsx("dropdown ")}>
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
      <Modal open={open} onClose={handleClose}>
        <CreateCubeSessionForm
          onCompleted={() => console.log("on completed")}
        />
      </Modal>
    </>
  );
};

export default CubeSessionSelect;
