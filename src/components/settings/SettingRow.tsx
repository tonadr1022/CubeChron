import clsx from "clsx";
import { ReactNode } from "react";

type Props = {
  title: string;
  description: string;
  children: ReactNode;
  flexRow?: boolean;
};

const SettingRow = ({
  title,
  description,
  flexRow = true,
  children,
}: Props) => {
  return (
    <div className={clsx("flex pt-4", !flexRow && "flex-col")}>
      <div className="flex flex-col flex-1">
        <h2 className="text-xl">{title}</h2>
        <p className="prose text-xs">{description}</p>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default SettingRow;
