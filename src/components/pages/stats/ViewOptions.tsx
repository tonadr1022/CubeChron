import React from "react";

type Props = {};

const ViewOptions = (props: Props) => {
  return (
    <div className="flex gap-2">
      {statsViewOptions.map((option) => (
        <button
          onClick={handleOptionClick}
          className={clsx(
            "btn capitalize",
            activeViewOption === option ? "btn-primary" : "btn-neutral"
          )}
          key={option}
          value={option}>
          {option === "all" ? "All" : CUBE_TYPE_OPTIONS[option]}
        </button>
      ))}
    </div>
  );
};

export default ViewOptions;
