import {
  CubeSession,
  CubeSessionFragment,
  CubeSessionsDocument,
  SettingQueryDocument,
} from "@/__generated__/graphql";
import { useQuery } from "@apollo/client";
import React, { use } from "react";
import { FaAngleDown } from "react-icons/fa6";
type ItemProps = {
  session: CubeSessionFragment;
  active: boolean;
};
const CubeSessionItem = ({ session, active }: ItemProps) => {
  return (
    <div className="flex w-48 bg-base-300 py-2 pl-2 rounded-lg items-center relative">
      {active && (
        <div className=" rounded-lg bg-gradient bg-slate-500 p-0.5 absolute top-1 right-1">
          <p className="rounded-lg bg-secondary p-1 text-xs text-neutral-50">
            Current
          </p>
        </div>
      )}
      <div className="flex flex-col flex-1">
        <p className="text-md">{session.name}</p>
        <p className="text-xs text-base-content">{`Created: ${new Date(
          session.createdAt
        ).toLocaleDateString()}`}</p>
      </div>
      {!active && (
        <button className="btn btn-xs mr-1" onClick={() => console.log("open")}>
          <FaAngleDown />
        </button>
      )}
    </div>
  );
};

const CubeSessionsMenu = () => {
  const { data: sessions, loading, error } = useQuery(CubeSessionsDocument);
  const { data: setting } = useQuery(SettingQueryDocument);
  const cubeSessionId = setting?.setting.cubeSessionId;
  const cubeSessions = sessions?.cubeSessions;
  console.log(cubeSessions);
  return (
    <div className="flex flex-col gap-3">
      {cubeSessions?.map((session) => {
        const active = session.id === cubeSessionId;
        return (
          <CubeSessionItem key={session.id} session={session} active={active} />
        );
      })}
    </div>
  );
};

export default CubeSessionsMenu;
