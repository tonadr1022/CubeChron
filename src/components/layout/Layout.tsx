import { useAppSelector } from "@/hooks/reduxHooks";
import LeftSideBar from "./LeftSideBar";
import TopNavBar from "./TopNavBar";
import { Suspense, useEffect, useState } from "react";
import Loading from "../common/Loading";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import clsx from "clsx";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { status } = useSession();
  const { focusMode } = useAppSelector((state) => state.general);
  const [currentURL, setCurrentURL] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    setCurrentURL(router?.pathname);
  }, [router.pathname]);

  return (
    <>
      <div className={clsx("flex", { "h-screen": currentURL === "/" })}>
        {!focusMode && status === "authenticated" && (
          <div className="hidden sm:flex h-screen sticky top-0 left-0">
            <LeftSideBar />
          </div>
        )}
        <div className="w-full flex flex-col h-full">
          {!focusMode && (
            <div className="sm:hidden z-50 sticky top-0 left-0">
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
