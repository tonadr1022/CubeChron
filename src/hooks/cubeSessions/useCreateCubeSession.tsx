import {
  CreateCubeSessionDocument,
  CreateCubeSessionMutation,
  CubeSessionInput,
} from "@/__generated__/graphql";
import { CUBE_SESSION_FRAGMENT } from "@/graphql/fragments";
import { useMutation } from "@apollo/client";
type Props = {
  onCompleted?: (data: CreateCubeSessionMutation) => void;
};
export const useCreateCubeSession = ({ onCompleted }: Props) => {
  const [createCubeSessionMutation] = useMutation<CreateCubeSessionMutation>(
    CreateCubeSessionDocument,
    {
      update(cache, { data }) {
        console.log("data deez", data);
        cache.modify({
          fields: {
            cubeSessions(existingSessions = []) {
              const newSessionRef = cache.writeFragment({
                data: data?.createCubeSession,
                fragment: CUBE_SESSION_FRAGMENT,
              });
              return [...existingSessions, newSessionRef];
            },
          },
        });
      },
      onCompleted,
    }
  );

  const createCubeSession = (input: CubeSessionInput) => {
    return createCubeSessionMutation({
      variables: {
        input,
      },
      optimisticResponse(vars) {
        return {
          __typename: "Mutation",
          createCubeSession: {
            __typename: "CubeSession",
            id: "temp-id",
            name: input.name,
            createdAt: new Date().toISOString(),
            cubeType: input.cubeType,
            notes: input.notes,
          },
        };
      },
    });
  };
  return createCubeSession;
};
