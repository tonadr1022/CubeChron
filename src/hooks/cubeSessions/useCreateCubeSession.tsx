import {
  CreateCubeSessionDocument,
  CreateCubeSessionMutation,
  CubeSessionInput,
} from "@/__generated__/graphql";
import { CUBE_SESSION_FRAGMENT } from "@/graphql/fragments";
import { useMutation } from "@apollo/client";
export const useCreateCubeSession = () => {
  const [createCubeSessionMutation] = useMutation<CreateCubeSessionMutation>(
    CreateCubeSessionDocument,
    {
      update(cache, { data }) {
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
    }
  );
  const createCubeSession = (input: CubeSessionInput) => {
    console.log({ input });
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
            cubeType: input.cubeType,
            notes: input.notes,
          },
        };
      },
    });
  };
  return createCubeSession;
};
