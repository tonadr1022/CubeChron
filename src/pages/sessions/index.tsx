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
import CubeSessionsMenu from "@/components/sessions/CubeSessionsMenu";
import SolveTable from "@/components/solves/SolveTable";
import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

const SessionsPage = () => {
  const [addSessionOpen, setAddSessionOpen] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const { data: sessions, loading, error } = useQuery(CubeSessionsDocument);
  const { data: setting } = useQuery(SettingQueryDocument);
  const cubeSessionId = setting?.setting.cubeSessionId;
  const cubeSessions = sessions?.cubeSessions;
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
  if (loading || l2) return <Loading />;
  if (error || e2) return <p>Error loading Data</p>;

  let solves = solvesQuery?.solves;
  solves = solves?.filter((solve) => solve.cubeSessionId === selectedId);
  return (
    <>
      <Toaster position="bottom-left" />
      <div className="h-full p-6">
        <TitleBar title="Sessions">
          <button
            onClick={() => setAddSessionOpen(true)}
            className="btn btn-primary">
            Add Session
          </button>
        </TitleBar>
        <div className="flex flex-col md:flex-row gap-4 ">
          <div className="">
            <CubeSessionsMenu
              cubeSessions={cubeSessions}
              selectedId={selectedId}
              activeId={cubeSessionId!}
              setSelectedId={setSelectedId}
            />
          </div>
          <div className="w-full flex flex-col gap-4">
            <SolvesOverTime solves={solves!} />
            <SolveTable solves={solves!} />
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
