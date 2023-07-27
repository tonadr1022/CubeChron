import {
  CreateSolveInput,
  CreateSolveDocument,
  CreateSolveMutation,
  UpdateSolveDocument,
  SolveFragmentDoc,
  UpdateSolveInput,
  Solve,
  SolveFragment,
  UpdateSolveMutationVariables,
  UpdateSolveMutation,
  SolveDocument,
} from "@/__generated__/graphql";
import { SOLVE_FRAGMENT } from "@/graphql/mutations";
import { gql, useMutation } from "@apollo/client";

// Define the return type for the mutation data
interface CreateSolveData {
  createSolve: CreateSolveInput;
}

export const useCreateSolve = () => {
  // Use the useMutation hook and get the mutation function
  const [createSolveMutation] = useMutation<CreateSolveMutation>(
    CreateSolveDocument,
    {
      update(cache, { data }) {
        cache.modify({
          fields: {
            solves(existingSolves = []) {
              const newSolveRef = cache.writeFragment({
                data: data?.createSolve,
                fragment: SOLVE_FRAGMENT,
              });
              return [...existingSolves, newSolveRef];
            },
          },
        });
      },
    }
  );
  const createSolve = (input: CreateSolveInput) => {
    return createSolveMutation({
      variables: {
        input,
      },
      optimisticResponse(vars) {
        return {
          __typename: "Mutation",
          createSolve: {
            __typename: "Solve",
            ...input,
            notes: null,
            createdAt: new Date().toISOString(),
          },
        };
      },
    });
  };
  return createSolve;
};

export const useUpdateSolve = () => {
  const [updateSolveMutation] = useMutation<UpdateSolveMutation>(
    UpdateSolveDocument,
    {
      // update(cache, { data }) {
      //   const { updateSolve } = data || { updateSolve: null };
      //   // Read the existing solve data from the cache
      //   const existingSolve = cache.readQuery<SolveFragment>({query: SolveDocument});
      //   // Merge the existing solve data with the updated data from the mutation response
      //   const updatedSolve = { ...existingSolve, ...updateSolve };
      //   // Write the updated solve data back to the cache
      //   cache.writeQuery({
      //     query: SolveDocument,
      //     data: updatedSolve,
      //   });
      // },
    }
  );
  const updateSolve = (
    solve: SolveFragment,
    input: Partial<UpdateSolveInput>
  ) => {
    return updateSolveMutation({
      variables: {
        id: solve.id,
        input,
      },
      optimisticResponse(vars) {
        return {
          __typename: "Mutation",
          updateSolve: {
            __typename: "Solve",
            ...solve,
            ...input,
          },
        };
        // return {
        //   __typename: "Solve",
        //   ...input,
        //   notes: null,
        //   createdAt: new Date().toISOString(),
        // };
      },
    });
  };
  return updateSolve;
};
