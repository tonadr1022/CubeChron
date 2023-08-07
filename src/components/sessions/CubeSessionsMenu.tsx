import { CubeSessionFragment } from "@/__generated__/graphql";
import CubeSessionMenuItem from "./CubeSessionMenuItem";

type CubeSessionsMenuProps = {
  cubeSessions?: CubeSessionFragment[];
  selectedId: string;
  setSelectedId: (id: string) => void;
  activeId: string;
};

const CubeSessionsMenu = ({
  cubeSessions,
  selectedId,
  setSelectedId,
  activeId,
}: CubeSessionsMenuProps) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      {cubeSessions?.map((session) => {
        const active = session.id === activeId;
        return (
          <CubeSessionMenuItem
            key={session.id}
            session={session}
            active={active}
            setSelectedId={setSelectedId}
            selected={session.id === selectedId}
          />
        );
      })}
    </div>
  );
};

export default CubeSessionsMenu;
