import {
  CubeSessionUpdateInput,
  UpdateCubeSessionDocument,
  UpdateCubeSessionMutation,
} from "@/__generated__/graphql";
import { CUBE_SESSION_FRAGMENT } from "@/graphql/fragments";
import { useMutation } from "@apollo/client";
import { toast } from "react-hot-toast";
type Props = {
  onCompleted?: (data: UpdateCubeSessionMutation) => void;
};

export const useUpdateCubeSession = ({ onCompleted }: Props) => {
  const [updateCubeSessionMutation] = useMutation<UpdateCubeSessionMutation>(
    UpdateCubeSessionDocument,
    {
      update(cache, { data }) {
        cache.modify({
          fields: {
            cubeSessions(existingSessions = []) {
              cache;
              const newSessionRef = cache.writeFragment({
                id: cache.identify(data?.updateCubeSession!),
                data: data?.updateCubeSession,
                fragment: CUBE_SESSION_FRAGMENT,
              });
              return [...existingSessions, newSessionRef];
            },
          },
        });
      },
      onCompleted,
      onError() {
        toast.error("Failed to save cube session");
      },
    }
  );

  const updateCubeSession = (id: string, input: CubeSessionUpdateInput) => {
    return updateCubeSessionMutation({
      variables: {
        id,
        input,
      },
      optimisticResponse(vars) {
        return {
          __typename: "Mutation",
          updateCubeSession: {
            __typename: "CubeSession",
            id: vars.id,
            name: input.name || "",
            createdAt: new Date().toISOString(),
            cubeType: input.cubeType || "",
            notes: input.notes || "",
          },
        };
      },
    });
  };
  return updateCubeSession;
};
