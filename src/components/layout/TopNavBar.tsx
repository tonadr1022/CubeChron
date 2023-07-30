import Image from "next/image";
import React from "react";
import { RxHamburgerMenu, RxTimer } from "react-icons/rx";
import { FaChartPie, FaCubesStacked, FaGear, FaListUl } from "react-icons/fa6";
import Link from "next/link";
import { handleDropdownOptionClick } from "@/utils/handleDropdownOptionClick";
type TopNavItemProps = {
  icon: any;
  text: string;
  href: string;
};
const TopNavMenuItem = ({ icon, text, href }: TopNavItemProps) => {
  return (
    <li>
      <Link className="flex" href={href} onClick={handleDropdownOptionClick}>
        {icon}
        <span>{text}</span>
      </Link>
    </li>
  );
};

const TopNavBar = () => {
  return (
    <div className="navbar bg-base-200 min-h-8">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-sm btn-ghost btn-circle">
            <RxHamburgerMenu />
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box">
            <TopNavMenuItem icon={<RxTimer />} text="Timer" href="/" />
            <TopNavMenuItem icon={<FaChartPie />} text="Stats" href="/stats" />
            <TopNavMenuItem
              icon={<FaCubesStacked />}
              text="Solves"
              href="solves"
            />
            <TopNavMenuItem
              icon={<FaListUl />}
              text="Sessions"
              href="sessions"
            />
            <TopNavMenuItem icon={<FaGear />} text="Settings" href="settings" />
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <Image
          src={"/pwa-512x512.png"}
          alt="ChronoCube Logo"
          width={30}
          height={30}
        />
      </div>
      {/* <div className="navbar-end">
        <button className="btn btn-ghost btn-circle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
        <button className="btn btn-ghost btn-circle">
          <div className="indicator">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <span className="badge badge-xs badge-primary indicator-item"></span>
          </div>
        </button>
      </div> */}
    </div>
  );
};

export default TopNavBar;
