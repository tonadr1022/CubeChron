import { getScramble } from "@/utils/getScramble";
import { useEffect } from "react";
import ScrambleDisplay from "./ScrambleDisplay";
import Timer from "./Timer";
import { useAppSelector, useAppDispatch } from "@/hooks/reduxHooks";
import { setCurrentScramble } from "@/redux/slices/scrambleSlice";
import { useSession } from "next-auth/react";
import { useQuery } from "@apollo/client";
import Loading from "./Loading";
import { User } from "@/__generated__/graphql";
import { setUser } from "@/redux/slices/userSlice";

const Scramble = () => {
  const { currentScramble } = useAppSelector((state) => state.scramble);
  const { scrambleType } = useAppSelector((state) => state.scramble);
  const dispatch = useAppDispatch();
  // dispatch(setUser(user));
  const scramble = useAppSelector((state) => state.scramble.currentScramble);
  const session = useSession();

  useEffect(() => {
    if (currentScramble === "") {
      const generateScramble = () => {
        const initialScramble = getScramble({
          scrambleType,
        });
        dispatch(setCurrentScramble(initialScramble));
      };
      generateScramble();
    }
  }, [dispatch, currentScramble, scrambleType]);

  return scramble ? <ScrambleDisplay scramble={scramble} /> : <Loading />;
};

export default Scramble;
