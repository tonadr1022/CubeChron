import React from "react";
import { FaTrash } from "react-icons/fa6";

type Props = {};

const LeftSideBar = (props: Props) => {
  return (
    <div className="drawer-side h-screen bg-base">
      <label htmlFor="left-sidebar-drawer" className="drawer-overlay"></label>
      <ul className="menu pt-2 w-40 bg-base-300 text-base-content">
        <button
          className="btn btn-ghost bg-base-300  btn-circle z-50 top-0 right-0 mt-4 mr-2 absolute lg:hidden"
          onClick={() => close()}>
          <FaTrash className="h-5 inline-block w-5" />
        </button>
        <li className="mb-2 font-semibold text-xl">l;kjl;kjlk;j</li>
        <li className="mb-2 font-semibold text-xl">l;kjl;kjlk;j</li>
        <li className="mb-2 font-semibold text-xl">l;kjl;kjlk;j</li>
        <li className="mb-2 font-semibold text-xl">l;kjl;kjlk;j</li>
        <li className="mb-2 font-semibold text-xl">l;kjl;kjlk;j</li>
      </ul>
    </div>
  );
};

export default LeftSideBar;
