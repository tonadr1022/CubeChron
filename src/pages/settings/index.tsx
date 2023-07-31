import ThemeSwitch from "@/components/ThemeSwitch";
import { signOut, useSession } from "next-auth/react";
import React, { useState } from "react";

const SettingsPage = () => {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col">
      <h1>SettingsPage</h1>
      <ThemeSwitch />
      <button className="btn" onClick={() => signOut()}>
        Logout
      </button>
      <div>{session?.user?.name}</div>
      <div>{session?.user?.email}</div>
    </div>
  );
};

export default SettingsPage;
