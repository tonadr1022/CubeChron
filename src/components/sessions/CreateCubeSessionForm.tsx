import {
  CreateCubeSessionDocument,
  CubeSessionInput,
  SettingQueryDocument,
} from "@/__generated__/graphql";
import React, { useState } from "react";
import { CUBE_TYPE_OPTIONS } from "@/constants/constants";
import { useMutation, useQuery } from "@apollo/client";
import { useCreateCubeSession } from "@/hooks/cubeSessions/useCreateCubeSession";
import { useUpdateSetting } from "@/hooks/settings/useUpdateSetting";
type Props = {};

const initialFormState: CubeSessionInput = {
  name: "",
  cubeType: "333",
  notes: "",
};

const CreateCubeSessionForm = (props: Props) => {
  const { data: setting } = useQuery(SettingQueryDocument);
  const createCubeSession = useCreateCubeSession();
  const updateSetting = useUpdateSetting();
  const [data, setData] = useState(initialFormState);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createCubeSession(data);
    updateSetting(setting!, {
      cubeType: data.cubeType!,
      id: setting!.setting.id,
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold pb-2">Create Cube Session</h2>
        {/* description */}
        <p className="text-base">
          Sessions are cube type agnostic. Each session can track data for
          different cube types.
        </p>
        <label htmlFor="name" className="label pb-0">
          <span className="label-text text-base">Name</span>
        </label>
        <input
          className="input input-sm input-bordered w-full max-w-xs"
          type="text"
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />
        <label htmlFor="cubeType" className="label pb-0">
          <span className="text-base label-text">Cube Type</span>
        </label>
        <select
          className="select select-sm select-bordered w-full max-w-xs"
          name="cubeType"
          value={data.cubeType}
          onChange={(e) => setData({ ...data, cubeType: e.target.value })}>
          {Object.entries(CUBE_TYPE_OPTIONS).map(([key, value]) => (
            <option key={key} value={key}>
              {value}
            </option>
          ))}
        </select>
        <label htmlFor="notes" className="label pb-0">
          <span className="text-base label-text">Notes</span>
        </label>
        <textarea
          name="notes"
          className="textarea textarea-bordered w-full max-w-xs"
          value={data.notes!}
          onChange={(e) => setData({ ...data, notes: e.target.value })}
        />
        <button className="btn btn-neutral text-center" type="submit">
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateCubeSessionForm;
