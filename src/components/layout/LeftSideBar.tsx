import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { setNavCollapsed } from "@/redux/slices/generalSlice";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  FaChartPie,
  FaChevronLeft,
  FaChevronRight,
  FaCubesStacked,
  FaGear,
  FaListUl,
} from "react-icons/fa6";
import { RxTimer } from "react-icons/rx";

type Props = {
  children: React.ReactNode;
};

const LeftSideBarShell = ({ children }: Props) => {
  const dispatch = useAppDispatch();
  const { navCollapsed } = useAppSelector((state) => state.general);
  return (
    <nav
      className={clsx(
        "h-full flex flex-col bg-base-300 w-16",
        !navCollapsed ? "md:w-56" : "md:w-16"
      )}>
      <div className="flex pt-4 justify-center">
        <Image
          src={"/pwa-512x512.png"}
          alt="ChronoCube Logo"
          width={30}
          height={30}
        />
        {!navCollapsed && (
          <span className="hidden md:flex pl-2 text-xl font-bold self-center">
            CubeChron
          </span>
        )}
      </div>
      <ul
        className={clsx(
          "flex-1 pt-2 text-base-content flex flex-col items-center md:items-start",
          navCollapsed && "md:items-center md:ml-0",
          !navCollapsed && "md:ml-4"
        )}>
        {children}
      </ul>
      <div className="flex justify-center mb-10">
        <button
          className="absolute bottom-12 h-8"
          onClick={() => dispatch(setNavCollapsed(!navCollapsed))}>
          {navCollapsed ? (
            <FaChevronRight />
          ) : (
            <div className="hidden md:flex items-center">
              <FaChevronLeft />
              <span className="pl-2">Collapse</span>
            </div>
          )}
        </button>
      </div>
    </nav>
    // </aside>
  );
};

const LeftSideBar = () => {
  return (
    <LeftSideBarShell>
      <SideBarItem icon={<RxTimer />} text="Timer" href="/" />
      <SideBarItem icon={<FaChartPie />} text="Stats" href="/stats" />
      <SideBarItem icon={<FaCubesStacked />} text="Solves" href="/solves" />
      <SideBarItem icon={<FaListUl />} text="Sessions" href="/sessions" />
      <SideBarItem icon={<FaGear />} text="Settings" href="/settings" />
    </LeftSideBarShell>
  );
};

export default LeftSideBar;

type SideBarItemProps = {
  icon: any;
  text: string;
  href: string;
};

export const SideBarItem = ({ icon, text, href }: SideBarItemProps) => {
  const { navCollapsed } = useAppSelector((state) => state.general);
  return (
    <li className="py-2">
      <Link
        href={href}
        className={clsx(
          "flex items-center opacity-50 hover:opacity-100 transition-opacity cursor-pointer"
        )}>
        {icon}
        {!navCollapsed && (
          <div className="hidden md:block">
            <span className="pl-2">{text}</span>
          </div>
        )}
      </Link>
    </li>
  );
};
