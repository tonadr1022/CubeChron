import Image from "next/image";
import { Inter } from "next/font/google";
// import { useEffect } from "react";
// import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Session, getServerSession } from "next-auth";
import gql from "graphql-tag";
import { initializeApollo } from "@/lib/apollo-client";
import { CubeSession, User } from "@prisma/client";
import { authOptions } from "./api/auth/[...nextauth]";
import { getSession, useSession } from "next-auth/react";
import { useEffect } from "react";
import { GetServerSidePropsContext } from "next";
import { useQuery } from "@apollo/client";
import { graphql } from "@/__generated__";
import {
  CubeSessionsDocument,
  SettingQueryDocument,
  SettingQueryQuery,
  SolvesQueryDocument,
} from "@/__generated__/graphql";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import RightSideBar from "@/components/layout/RightSideBar";
import { Scrambow } from "scrambow";
import TimerScrambleContainer from "@/components/timer/TimerScrambleContainer";
import dynamic from "next/dynamic";
import OptionsBar from "@/components/optionsBar/OptionsBar";
import CubeDisplay from "@/components/cubeDisplay/CubeDisplay";
import Loading from "@/components/common/Loading";
import SolveTable from "@/components/solves/SolveTable";
import BottomBar from "@/components/layout/BottomBar";
import { purgeStoredState } from "redux-persist";
import { persistConfig } from "@/redux/store";
import Head from "next/head";
import ThemeSwitch from "@/components/ThemeSwitch";
import { setIsAuth } from "@/redux/slices/userSlice";
// import { UserQuery } from "@/__generated__/graphql";

// const inter = Inter({ subsets: ["latin"] });
type Props = {
  settingData: SettingQueryQuery;
};
const Home = () => {
  new Scrambow().get(1)[0].scramble_string;

  const dispatch = useAppDispatch();
  const { focusMode } = useAppSelector((state) => state.general);
  const theme = useAppSelector((state) => state.setting.theme);
  useEffect(() => {
    document.querySelector("html")!.setAttribute("data-theme", theme);
  }, [theme]);
  const { status } = useSession();
  if (status === "loading") return <Loading />;
  if (status === "authenticated") {
    dispatch(setIsAuth(true));
  } else {
    dispatch(setIsAuth(false));
  }
  return (
    <>
      <Head>
        <title>CubeChron</title>
      </Head>
      {/* {status === "authenticated" ? ( */}
      <>
        <div className="flex h-full flex-col md:flex-row-reverse bg-base text-base">
          {!focusMode && <RightSideBar />}
          <div className="flex flex-col flex-1">
            {/* Main content header */}
            <OptionsBar />
            {/* Main content body (timer) */}
            <TimerScrambleContainer />
            {!focusMode && (
              <div className="md:hidden">
                <BottomBar />
              </div>
            )}
          </div>
        </div>
      </>
      {/* ) : (
        <div className="prose flex h-full min-w-full flex-col bg-base text-base  items-center">
          <Image
            src={"/pwa-512x512.png"}
            alt="CubeChron logo"
            width={300}
            height={300}
          />
          <h1>Welcome to CubeChron</h1>
        </div>
      )} */}
    </>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  // const client = initializeApollo();
  new Scrambow().get(1)[0].scramble_string;
  // const session = await getSession(context);
  // if (!session?.user?.id) {
  //   return {
  //     redirect: {
  //       destination: "/login",
  //       permanent: false,
  //     },
  //   };
  // }
  return {
    props: { data: null },
  };
};
export default Home;
