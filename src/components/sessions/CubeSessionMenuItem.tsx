import { CubeSessionFragment } from "@/__generated__/graphql";
import clsx from "clsx";
import CubeSessionMenuItemOptions from "./CubeSessionMenuItemOptions";

type Props = {
  setSelectedId: (id: string) => void;
  session: CubeSessionFragment;
  active: boolean;
  selected: boolean;
};
const CubeSessionMenuItem = ({
  session,
  active,
  selected,
  setSelectedId,
}: Props) => {
  return (
    <div
      className={clsx(
        "cursor-pointer flex w-64 bg-base-300 p-4 rounded-lg items-center relative",
        { "ring-2 ring-primary": selected }
      )}
      onClick={() => setSelectedId(session.id)}>
      {active && (
        <div className="rounded-lg p-0.5 absolute top-2 right-2">
          <p className="rounded-lg bg-primary p-1 text-xs text-neutral-50">
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
        <CubeSessionMenuItemOptions name={session.name!} id={session.id} />
      )}
    </div>
  );
};

export default CubeSessionMenuItem;
