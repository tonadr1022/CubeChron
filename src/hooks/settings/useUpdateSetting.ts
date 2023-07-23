import {
  MutationUpdateSettingArgs,
  Setting,
  SettingQueryDocument,
  SettingQueryQuery,
  UpdateSettingDocument,
  UpdateSettingInput,
  UpdateSettingMutation,
  UpdateSettingMutationVariables,
} from "@/__generated__/graphql";
import { gql, useMutation, useQuery } from "@apollo/client";

export const useUpdateSetting = () => {
  console.log("useUpdateSetting");
  const [updateSettingMutation] = useMutation(UpdateSettingDocument, {
    update(cache, { data }) {
      console.log({ data });
      cache.modify({
        fields: {
          settings(existingSettings = []) {
            const newSettingRef = cache.writeFragment({
              data,
              fragment: gql`
                fragment NewSetting on Setting {
                  id
                  focusMode
                  cubeType
                  cubeDisplayDimension
                  cubeSessionId
                }
              `,
            });
            return [...existingSettings, newSettingRef];
          },
        },
      });
    },
  });

  const updateSetting = (
    { setting }: SettingQueryQuery,
    input: Partial<UpdateSettingInput>
  ) => {
    return updateSettingMutation({
      variables: {
        input: {
          id: input.id!,
          ...input,
        },
      },
      optimisticResponse(vars) {
        // merge the new input with the existing setting
        const updatedSetting = {
          ...setting,
          ...input,
        };
        return {
          __typename: "Mutation",
          updateSetting: {
            __typename: "Setting",
            ...updatedSetting,
          },
        };
      },
    });
  };
  return updateSetting;
};
