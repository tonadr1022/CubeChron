import {
  CreateSolveInput,
  CreateSolveDocument,
  CreateSolveMutation,
} from "@/__generated__/graphql";
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
      update(cache, { data: { createSolve } }) {
        cache.modify({
          fields: {
            solves(existingSolves = []) {
              const newSolveRef = cache.writeFragment({
                data: createSolve,
                fragment: gql`
                  fragment NewSolve on Solve {
                    id
                    duration
                    dnf
                    plusTwo
                    scramble
                    cubeType
                    cubeSessionId
                  }
                `,
              });
              return [...existingSolves, newSolveRef];
            },
          },
        });
      },
    }
  );
  // Return a function that can be used to trigger the mutation
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
