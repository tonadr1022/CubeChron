import {
  DeleteCubeSessionDocument,
  SettingQueryDocument,
} from "@/__generated__/graphql";
import { useUpdateSetting } from "@/hooks/settings/useUpdateSetting";
import { useMutation, useQuery } from "@apollo/client";
import clsx from "clsx";
import React from "react";
import { FaAngleDown } from "react-icons/fa6";
import { handleDropdownOptionClick } from "@/utils/handleDropdownOptionClick";
import { toast } from "react-hot-toast";
type Props = {
  name: string;
  id: string;
};
const CubeSessionMenuItemOptions = ({ id, name }: Props) => {
  const updateSetting = useUpdateSetting();
  const [deleteCubeSession] = useMutation(DeleteCubeSessionDocument, {
    update(cache, { data }) {
      const deletedCubeSessionId = data?.deleteCubeSession?.id;
      cache.modify({
        fields: {
          cubeSessions(existingSessions = [], { readField }) {
            return existingSessions.filter((sessionRef: any) => {
              return deletedCubeSessionId !== readField("id", sessionRef);
            });
          },
        },
      });
    },
    onCompleted() {
      toast.success(`${name} deleted successfully`);
    },
    onError() {
      toast.error(`Failed to delete ${name}`);
    },
  });
  const { data: setting } = useQuery(SettingQueryDocument);
  const handleSetActive = () => {
    handleDropdownOptionClick();
    updateSetting(setting!, {
      cubeSessionId: id,
      id: setting!.setting.id,
    });
  };
  const handleDelete = () => {
    handleDropdownOptionClick();
    deleteCubeSession({
      variables: { id },
      optimisticResponse: {
        __typename: "Mutation",
        deleteCubeSession: {
          __typename: "CubeSession",
          id,
        },
      },
    });
  };
  return (
    <div
      className="dropdown dropdown-end"
      onClick={(e) => {
        e.stopPropagation();
      }}>
      <div tabIndex={0} className="m-1 btn btn-xs bg-base-300">
        <FaAngleDown />
      </div>
      <ul
        tabIndex={0}
        className={clsx(
          "p-2 shadow menu dropdown-content bg-base-100 rounded-box w-40 max-h-64 overflow-y-auto block z-50"
        )}>
        <li>
          <button onClick={handleSetActive}>Make Current</button>
          <button onClick={handleDelete}>Delete Session</button>
        </li>
      </ul>
    </div>
  );
};

export default CubeSessionMenuItemOptions;
