import LeftSideBar from "./LeftSideBar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* <div className="drawer xl:drawer-open">
        <input
          id="left-sidebar-drawer"
          type="checkbox"
          className="drawer-toggle"
        />
        <main className=" drawer-content h-screen">{children}</main>
        <LeftSideBar />
      </div> */}
      <main className="h-screen">{children}</main>
    </>
  );
}
