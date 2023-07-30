import ThemeSwitch from "@/components/ThemeSwitch";
import { signOut } from "next-auth/react";
import React, { useState } from "react";

const SettingsPage = () => {
  return (
    <div>
      <span>SettingsPage</span>
      <ThemeSwitch />
      <button onClick={() => signOut()}>Logout</button>
    </div>
  );
};

export default SettingsPage;
