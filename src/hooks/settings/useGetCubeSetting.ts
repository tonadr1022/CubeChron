import { useLazyQuery } from "@apollo/client";
import { useAppSelector } from "../reduxHooks";
import { SettingQueryDocument } from "@/__generated__/graphql";
import { useEffect } from "react";

export const useGetCubeSetting = () => {
  const { isAuth } = useAppSelector((state) => state.user);
  const localSetting = useAppSelector((state) => state.cubeSetting);
  const [getSetting, { data, loading, error }] =
    useLazyQuery(SettingQueryDocument);
  let cubeSessionId: string;
  let cubeType: string;
  useEffect(() => {
    if (isAuth) {
      getSetting();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth]);

  if (isAuth) {
    cubeSessionId = data?.setting?.cubeSessionId!;
    cubeType = data?.setting?.cubeType!;
    return data?.setting;
  } else {
    cubeSessionId = localSetting.cubeSessionId;
    cubeType = localSetting.cubeType;
    return localSetting;
  }
};
