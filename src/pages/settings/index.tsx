import AppearanceOptions from "@/components/settings/appearance/AppearanceOptions";
import DataOptions from "@/components/settings/data/DataOptions";
import FileExportMenu from "@/components/settings/data/FileExportMenu";
import TimerOptions from "@/components/settings/timer/TimerOptions";
import { useTheme } from "@/hooks/useTheme";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
const options = ["Timer", "Appearance", "Data"];
const SettingsPage = () => {
  const [menuOption, setMenuOption] = useState("Timer");
  useTheme();
  const router = useRouter();

  const handleLogout = () => {
    signOut({ redirect: false });
    router.push("/login");
  };

  return (
    // <div className="flex justify-center w-full">
    <div className="p-6 max-w-md">
      <h1 className="text-6xl font-semibold">Settings</h1>
      <div className="mt-3">
        {options.map((option) => (
          <input
            key={option}
            type="radio"
            name="options"
            data-title={option}
            className="mr-2 btn btn-sm"
            value={option}
            aria-label={option}
            checked={menuOption === option}
            onChange={(e) => setMenuOption(e.target.value)}
          />
        ))}
      </div>
      <div className="flex flex-col">
        {menuOption === "Appearance" && <AppearanceOptions />}
        {menuOption === "Timer" && <TimerOptions />}
        {menuOption === "Data" && <DataOptions />}
        <button className="btn mt-4" onClick={handleLogout}>
          Logout
        </button>
        {/* <div>{session?.user?.name}</div>
        <div>{session?.user?.email}</div> */}
      </div>
    </div>
    // </div>
  );
};

export default SettingsPage;
