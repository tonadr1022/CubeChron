import clsx from "clsx";

type ThemeMenuOptionProps = {
  name: string;
  active: boolean;
  handleClick: (option: string) => void;
};

const ThemeMenuOption = ({
  name,
  active,
  handleClick,
}: ThemeMenuOptionProps) => {
  return (
    <div
      className={clsx(
        "bg-base-300 rounded-lg p-2 text-center text-xs font-semibold cursor-pointer m-1",
        active && "ring-2 ring-primary"
        // active && "border-primary border-2"
      )}
      onClick={() => handleClick(name)}>
      {name}
    </div>
  );
};

export default ThemeMenuOption;
