import { graphql } from "@/__generated__";
import React from "react";
import { gql, useQuery } from "@apollo/client";
import { FragmentType } from "@/__generated__/fragment-masking";
import { useSession } from "next-auth/react";
import { selectUser } from "@/redux/slices/userSlice";
import { useAppSelector } from "@/hooks/reduxHooks";
import { SolvesDocument } from "@/__generated__/graphql";
gql`
  query Solves($userId: String!) {
    solves(userId: $userId) {
      createdAt
      cubeSessionId
      cubeType
      dnf
      duration
      id
      notes
      plusTwo
      scramble
    }
  }
`;

const RightSideBar = () => {
  const userId = useAppSelector(selectUser);

  const { data, loading, error } = useQuery(SolvesDocument, {
    variables: { userId },
  });
  console.log("data");
  if (loading) return <div>solve data loading</div>;
  if (error) return <div>err</div>;
  return <div>{data?.solves[0]?.duration || "no solves"}</div>;
  // return <div>RightSideBar</div>;
};

export default RightSideBar;
