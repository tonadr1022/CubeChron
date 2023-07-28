import {
  SettingQueryDocument,
  SolvesQueryDocument,
} from "@/__generated__/graphql";
import { getCubeSessionTypeSolves } from "@/data/getCubeSessionTypeSolves";
import { useQuery } from "@apollo/client";

export const useSessionTypeSolves = () => {
  const { data, loading, error } = useQuery(SolvesQueryDocument);
  const { data: setting, loading: loading2 } = useQuery(SettingQueryDocument);
  const cubeSessionId = setting?.setting.cubeSessionId!;
  const cubeType = setting?.setting.cubeType!;
  const solves = data?.solves
    ? getCubeSessionTypeSolves(data?.solves, cubeSessionId, cubeType)
    : [];
  return { solves, loading, error };
};
