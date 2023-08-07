import React from "react";
type Props = {
  title: string;
  children?: React.ReactNode;
};
const TitleBar = ({ title, children }: Props) => {
  return (
    <div className="flex items-center justify-center mb-4">
      <h1 className="text-6xl font-semibold flex-1">{title}</h1>
      {children}
    </div>
  );
};

export default TitleBar;
