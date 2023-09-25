import { CubeSessionFragment } from "@/__generated__/graphql";
import { useUpdateCubeSession } from "@/hooks/cubeSessions/useUpdateCubeSession";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

type Props = {
  activeCubeSession: CubeSessionFragment;
};

const SessionNotes = ({ activeCubeSession }: Props) => {
  const [notes, setNotes] = useState(activeCubeSession?.notes || "");
  const updateCubeSession = useUpdateCubeSession({
    onCompleted: () => {
      toast.success("Notes saved successfully");
      setSubmitLoading(false);
    },
  });

  useEffect(() => {
    setNotes(activeCubeSession?.notes || "");
  }, [activeCubeSession?.notes]);

  const [submitLoading, setSubmitLoading] = useState(false);

  const handleNoteSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateCubeSession(activeCubeSession.id, { notes });
    setSubmitLoading(true);
  };
  if (!activeCubeSession) return null;

  return (
    <form
      onSubmit={handleNoteSave}
      className="flex flex-col justify-center items-center text-center gap-4">
      <textarea
        className="textarea input-bordered w-full input-primary"
        rows={4}
        onChange={(e) => setNotes(e.target.value)}
        value={notes}
      />
      <button className="btn btn-primary max-w-fit" type="submit">
        {submitLoading ? "Saving..." : "Save"}
      </button>
    </form>
  );
};

export default SessionNotes;
