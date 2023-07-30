import { useAppSelector } from "@/hooks/reduxHooks";
import LeftSideBar from "./LeftSideBar";
import TopNavBar from "./TopNavBar";
import { Suspense } from "react";
import Loading from "../common/Loading";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { focusMode } = useAppSelector((state) => state.general);
  return (
    <>
      {/* <div className="drawer lg:drawer-open">
        <input
          id="left-sidebar-drawer"
          type="checkbox"
          className="drawer-toggle"
        />
        <div className="lg:hidden">Nav</div>
        <main className=" drawer-content h-screen">{children}</main>
        <LeftSideBar />
      </div> */}
      <div className="flex">
        {!focusMode && (
          <div className="hidden sm:flex">
            <LeftSideBar />
          </div>
        )}
        <div className="w-full h-screen flex flex-col">
          {!focusMode && (
            <div className="sm:hidden">
              <TopNavBar />
            </div>
          )}
          <div className="h-full">
            <Suspense fallback={<Loading />}>{children}</Suspense>
          </div>
        </div>
      </div>
    </>
  );
}
