import ThemeSwitch from "@/components/ThemeSwitch";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState } from "react";

const SettingsPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const handleLogout = () => {
    signOut({ redirect: false });
    router.push("/login");
  };

  return (
    <div className="flex flex-col">
      <h1>SettingsPage</h1>
      <ThemeSwitch />
      <button className="btn" onClick={handleLogout}>
        Logout
      </button>
      <div>{session?.user?.name}</div>
      <div>{session?.user?.email}</div>
    </div>
  );
};

export default SettingsPage;
