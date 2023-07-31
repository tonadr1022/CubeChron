import CubeSessionsMenu from "@/components/sessions/CubeSessionsMenu";
import React from "react";

const SessionsPage = () => {
  return (
    <div className="h-full p-6">
      <h1 className="text-6xl font-semibold">Sessions</h1>
      <CubeSessionsMenu />
    </div>
  );
};

export default SessionsPage;
