import { SolvesQueryDocument } from "@/__generated__/graphql";
import { useQuery } from "@apollo/client";
import React, { useMemo } from "react";
import Papa from "papaparse";
type ExportType = "json" | "csv" | "txt";
const FileExportMenu = () => {
  const { data: solves } = useQuery(SolvesQueryDocument);

  const handleFileExport = useMemo(
    () => (type: ExportType) => {
      if (!solves?.solves) return;
      const filteredSolves = solves?.solves.map(
        ({ __typename, ...rest }) => rest
      );

      let content, mimeType, extension;

      if (type === "csv") {
        content = Papa.unparse(filteredSolves);
        mimeType = "text/csv";
        extension = "csv";
      } else if (type === "json") {
        content = JSON.stringify(filteredSolves);
        mimeType = "application/json";
        extension = "json";
      } else if (type === "txt") {
        console.log("txt");
      } else {
        console.error("Invalid export type");
        return;
      }
      if (content) {
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.download = `cubechron_solves.${extension}`;
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
      } else {
        console.error("No content");
      }
    },
    [solves?.solves]
  );

  return (
    <div className="flex flex-col gap-1">
      <button className="btn btn-xs" onClick={() => handleFileExport("json")}>
        JSON
      </button>
      <button className="btn btn-xs" onClick={() => handleFileExport("csv")}>
        CSV
      </button>
      <button className="btn btn-xs" onClick={() => handleFileExport("txt")}>
        TXT
      </button>
    </div>
  );
};

export default FileExportMenu;
