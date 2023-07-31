import React from "react";
import SettingRow from "../SettingRow";
import FileExportMenu from "./FileExportMenu";

const DataOptions = () => {
  return (
    <>
      <SettingRow
        title="Export Solves"
        description="Export all of your solves to CSV, TXT, or JSON">
        <FileExportMenu />
      </SettingRow>
    </>
  );
};

export default DataOptions;
