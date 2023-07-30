import {
  SettingQueryDocument,
  SolvesQueryDocument,
} from "@/__generated__/graphql";
import { getCubeSessionTypeSolves } from "@/data/getCubeSessionTypeSolves";
import { useLazyQuery, useQuery } from "@apollo/client";
import { useAppDispatch, useAppSelector } from "../reduxHooks";
import { selectAllSolves } from "@/redux/slices/solvesSlice";
import { store } from "@/redux/store";
import { useEffect } from "react";

export const useSessionTypeSolves = () => {
  const { isAuth } = useAppSelector((state) => state.user);
  const localSolves = selectAllSolves(store.getState());
  const localSetting = useAppSelector((state) => state.cubeSetting);
  const [getSolves, { data, loading, error }] =
    useLazyQuery(SolvesQueryDocument);
  const [getSetting, { data: setting, loading: loading2 }] =
    useLazyQuery(SettingQueryDocument);

  useEffect(() => {
    if (isAuth) {
      getSetting();
      getSolves();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isAuth) {
    const cubeSessionId = setting?.setting.cubeSessionId!;
    const cubeType = setting?.setting.cubeType!;
    const solves = data?.solves
      ? getCubeSessionTypeSolves(data?.solves, cubeSessionId, cubeType)
      : [];
    return { solves, loading, error };
  } else {
    const cubeSessionId = localSetting.cubeSessionId;
    const cubeType = localSetting.cubeType;
    const solves = localSolves
      ? getCubeSessionTypeSolves(localSolves, cubeSessionId, cubeType)
      : [];
    return { solves, loading: false, error: false };
  }
};
