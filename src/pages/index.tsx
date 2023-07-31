import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { GetServerSidePropsContext } from "next";
import { SettingQueryQuery } from "@/__generated__/graphql";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import RightSideBar from "@/components/layout/RightSideBar";
import { Scrambow } from "scrambow";
import TimerScrambleContainer from "@/components/timer/TimerScrambleContainer";
import OptionsBar from "@/components/optionsBar/OptionsBar";
import Loading from "@/components/common/Loading";
import BottomBar from "@/components/layout/BottomBar";
import Head from "next/head";
import { setIsAuth } from "@/redux/slices/userSlice";
import Link from "next/link";
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
    return (
      <div className="flex justify-center">
        <div className="p-4 prose flex flex-col w-64 text-center items-center gap-4">
          <h2>Please Login or Register to sync solves across devices</h2>
          <Link href={"/login"} className="btn btn-sm">
            Login
          </Link>
          <Link href={"/register"} className="btn btn-sm">
            Register
          </Link>
        </div>
      </div>
    );
  }
  return (
    <>
      <Head>
        <title>CubeChron</title>
      </Head>
      <>
        <div className="flex h-full flex-col md:flex-row-reverse bg-base text-base">
          {!focusMode && <RightSideBar />}
          <div className="flex flex-col flex-1">
            <OptionsBar />
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
