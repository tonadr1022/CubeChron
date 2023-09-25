import {
  CubeSessionsDocument,
  SettingQueryDocument,
  SolvesQueryDocument,
} from "@/__generated__/graphql";
import Loading from "@/components/common/Loading";
import Modal from "@/components/common/Modal";
import SolvesOverTime from "@/components/graphs/SolvesOverTime";
import TitleBar from "@/components/pages/TitleBar";
import CreateCubeSessionForm from "@/components/sessions/CreateCubeSessionForm";
import CubeSessionMenuBar from "@/components/sessions/CubeSessionMenuBar";
import CubeSessionsMenu from "@/components/sessions/CubeSessionsMenu";
import SessionNotes from "@/components/sessions/SessionNotes";
import SolveTable from "@/components/solves/SolveTable";
import StatsModule from "@/components/stats/StatsModule";
import { handleDropdownOptionClick } from "@/utils/handleDropdownOptionClick";
import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

const SessionsPage = () => {
  const [addSessionOpen, setAddSessionOpen] = useState(false);
  const [activeCubeType, setActiveCubeType] = useState("333");
  const [selectedId, setSelectedId] = useState("");
  const { data: sessions, loading, error } = useQuery(CubeSessionsDocument);
  const { data: setting } = useQuery(SettingQueryDocument);
  const cubeSessionId = setting?.setting.cubeSessionId;
  const cubeType = setting?.setting.cubeType;
  const cubeSessions = sessions?.cubeSessions;
  const activeCubeSession = cubeSessions?.find(
    (session) => session.id === selectedId
  );
  const {
    data: solvesQuery,
    loading: l2,
    error: e2,
  } = useQuery(SolvesQueryDocument);

  useEffect(() => {
    if (cubeSessionId) {
      setSelectedId(cubeSessionId);
    }
  }, [cubeSessionId]);

  useEffect(() => {
    if (cubeType) {
      setActiveCubeType(cubeType);
    }
  }, [cubeType]);

  const handleCubeTypeChange = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    handleDropdownOptionClick();
    const value = e.currentTarget.getAttribute("value");
    setActiveCubeType(value!);
  };

  if (loading || l2) return <Loading />;
  if (error || e2) return <p>Error loading Data</p>;

  let solves = solvesQuery?.solves;
  solves = solves?.filter(
    (solve) =>
      solve.cubeSessionId === selectedId && solve.cubeType === activeCubeType
  );
  return (
    <>
      <Toaster position="bottom-left" />
      <div className="p-6">
        <TitleBar title="Sessions">
          <CubeSessionMenuBar
            setAddSessionOpen={setAddSessionOpen}
            cubeType={activeCubeType}
            handleCubeTypeChange={handleCubeTypeChange}
          />
        </TitleBar>
        <div className="flex flex-col md:flex-row gap-4 items-center md:items-start">
          <div className="">
            <CubeSessionsMenu
              cubeSessions={cubeSessions}
              selectedId={selectedId}
              activeId={cubeSessionId!}
              setSelectedId={setSelectedId}
            />
          </div>
          <div className="w-full flex flex-col gap-4">
            <div className="h-72">
              <SolvesOverTime solves={solves!} />
            </div>
            <div className="h-72 overflow-auto">
              <SolveTable solves={solves!} />
            </div>
            <div className="h-72">
              <StatsModule solves={solves!} />
            </div>
            {activeCubeSession && (
              <div>
                <SessionNotes activeCubeSession={activeCubeSession} />
              </div>
            )}
          </div>
        </div>
      </div>
      <Modal open={addSessionOpen} onClose={() => setAddSessionOpen(false)}>
        <CreateCubeSessionForm onCompleted={() => setAddSessionOpen(false)} />
      </Modal>
    </>
  );
};

export default SessionsPage;
