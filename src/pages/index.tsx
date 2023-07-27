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
import { useAppDispatch } from "@/hooks/reduxHooks";
import { setUser } from "@/redux/slices/userSlice";
import RightSideBar from "@/components/layout/RightSideBar";
import { Scrambow } from "scrambow";
import TimerScrambleContainer from "@/components/timer/TimerScrambleContainer";
import dynamic from "next/dynamic";
import OptionsBar from "@/components/optionsBar/OptionsBar";
import CubeDisplay from "@/components/cubeDisplay/CubeDisplay";
import Loading from "@/components/common/Loading";
import SolveTable from "@/components/solves/SolveTable";
import BottomBar from "@/components/layout/BottomBar";
// import { UserQuery } from "@/__generated__/graphql";

// const inter = Inter({ subsets: ["latin"] });
type Props = {
  settingData: SettingQueryQuery;
};
const Home = () => {
  const dispatch = useAppDispatch();
  const { data: session, status } = useSession();
  const userId = session?.user?.id;
  const { data: setting, loading, error } = useQuery(SettingQueryDocument);
  if (loading) return <Loading />;
  console.log({ setting });
  // const { data: solves, loading: loading2 } = useQuery(SolvesQueryDocument);
  // const { data: sessions, loading: loading3 } = useQuery(CubeSessionsDocument);

  if (status === "loading") {
    return <Loading />;
  }
  if (status === "unauthenticated" || !userId) {
    return <div>unauthenticated</div>;
  }
  dispatch(setUser(userId));
  return (
    // <div className="flex h-full flex-col sm:flex-row bg-slate-900 text-yellow-50">
    //   <div className="flex-1 flex flex-col">
    //     <OptionsBar />
    //     <div className="flex flex-1 flex-col justify-center items-center text-center">
    //       <TimerScrambleContainer />
    //     </div>
    //   </div>
    //   <div className="bg-dark-cyan w-80 h-full hidden sm:flex flex-col">
    //     <RightSideBar />
    //   </div>
    //   <div className="bg-dark-cyan w-full sm:hidden"></div>
    // </div>
    <div className="flex h-full flex-col md:flex-row-reverse bg-base text-base">
      <RightSideBar />
      <div className="flex flex-col flex-1">
        {/* Main content header */}
        <OptionsBar />
        {/* Main content body (timer) */}
        <TimerScrambleContainer />

        <div className="md:hidden">
          <BottomBar />
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const client = initializeApollo();
  new Scrambow().get(1)[0].scramble_string;
  const session = await getSession(context);
  if (!session?.user?.id) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  // // need to get user id from session but can't
  // const { data, loading, error } = await client.query({
  //   query: SolvesQueryDocument,
  // });
  // const {
  //   data: settingData,
  //   loading: k,
  //   error: j,
  // } = await client.query({
  //   query: SettingQueryDocument,
  // });
  // console.log({ settingData });
  return {
    props: { data: null },
  };
};
export default Home;
