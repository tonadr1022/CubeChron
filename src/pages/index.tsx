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
  SettingQueryDocument,
  SolvesQueryDocument,
} from "@/__generated__/graphql";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { setUser } from "@/redux/slices/userSlice";
import RightSideBar from "@/components/RightSideBar";
import { Scrambow } from "scrambow";
import TimerScrambleContainer from "@/components/TimerScrambleContainer";
import dynamic from "next/dynamic";
// import { UserQuery } from "@/__generated__/graphql";
const CubeDisplay = dynamic(
  () => import("../components/cubeDisplay/CubeDisplay"),
  {
    ssr: false,
  }
);
const inter = Inter({ subsets: ["latin"] });

const Home = () => {
  const dispatch = useAppDispatch();
  const { data: session, status } = useSession();
  const userId = session?.user?.id;
  if (status === "loading") {
    return <div>loading</div>;
  }
  if (status === "unauthenticated" || !userId) {
    return <div>unauthenticated</div>;
  }
  dispatch(setUser(userId));
  return (
    <main className="flex flex-row bg-slate-900 text-yellow-50">
      <div className="flex-1">
        <div className="flex flews-row m-3">
          <div className="flex-1">session</div>
          <div className="mx3">session</div>
          {/* <CubeSessionSelect /> */}
        </div>
        <div className="flex flex-col text-center ">
          <TimerScrambleContainer />
        </div>
        {/* <MainTimerOptions /> */}
      </div>
      <RightSideBar />
    </main>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const client = initializeApollo();
  new Scrambow().get(1)[0].scramble_string;
  // console.log("joe mama", { context });
  const session = await getSession(context);
  console.log({ session });
  console.log("123", session?.user?.id);
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
  //   data: o,
  //   loading: k,
  //   error: j,
  // } = await client.query({
  //   query: SettingQueryDocument,
  // });
  // console.log({ o, k, j });
  return {
    props: { d: "1" },
  };
};
export default Home;
