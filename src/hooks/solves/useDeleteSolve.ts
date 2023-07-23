import {
  DeleteSolveMutation,
  DeleteSolveMutationVariables,
  DeleteSolveDocument,
} from "@/__generated__/graphql";
import { gql, useMutation } from "@apollo/client";
export const useDeleteSolve = () => {
  const [deleteSolveMutation] = useMutation<
    DeleteSolveMutation,
    DeleteSolveMutationVariables
  >(DeleteSolveDocument);

  const deleteSolve = (solveId: string) => {
    return deleteSolveMutation({
      variables: {
        id: solveId,
      },
      update(cache) {
        cache.modify({
          fields: {
            solves(existingSolves = [], { readField }) {
              return existingSolves.filter(
                (solveRef: any) => readField("id", solveRef) !== solveId
              );
            },
          },
        });
      },
      optimisticResponse(vars) {
        return {
          __typename: "Mutation",
          deleteSolve: {
            __typename: "Solve",
            id: solveId,
          },
        };
      },
    });
  };

  return deleteSolve;
};
