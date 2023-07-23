/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: { input: any; output: any; }
};

export type CreateSolveInput = {
  cubeSessionId: Scalars['String']['input'];
  cubeType: Scalars['String']['input'];
  dnf?: InputMaybe<Scalars['Boolean']['input']>;
  duration: Scalars['Float']['input'];
  id: Scalars['String']['input'];
  notes?: InputMaybe<Scalars['String']['input']>;
  plusTwo?: InputMaybe<Scalars['Boolean']['input']>;
  scramble: Scalars['String']['input'];
};

export type CubeSession = {
  __typename?: 'CubeSession';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  notes?: Maybe<Scalars['String']['output']>;
  solves: Array<Solve>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user: User;
  userId?: Maybe<Scalars['String']['output']>;
};

export type CubeSessionInput = {
  name: Scalars['String']['input'];
  notes?: InputMaybe<Scalars['String']['input']>;
};

export type CubeSessionUpdateInput = {
  id: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createCubeSession: CubeSession;
  createSolve: Solve;
  deleteCubeSession: CubeSession;
  deleteSolve: Solve;
  updateCubeSession: CubeSession;
  updateSetting: Setting;
  updateSolve: Solve;
};


export type MutationCreateCubeSessionArgs = {
  input: CubeSessionInput;
};


export type MutationCreateSolveArgs = {
  input: CreateSolveInput;
};


export type MutationDeleteCubeSessionArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteSolveArgs = {
  id: Scalars['String']['input'];
};


export type MutationUpdateCubeSessionArgs = {
  input: CubeSessionUpdateInput;
};


export type MutationUpdateSettingArgs = {
  input: SettingUpdateInput;
};


export type MutationUpdateSolveArgs = {
  id: Scalars['String']['input'];
  input?: InputMaybe<UpdateSolveInput>;
};

export type Query = {
  __typename?: 'Query';
  cubeSessions: Array<CubeSession>;
  setting: Setting;
  solve: Solve;
  solves: Array<Solve>;
};


export type QuerySolveArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type Setting = {
  __typename?: 'Setting';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  cubeSessionId?: Maybe<Scalars['String']['output']>;
  cubeType?: Maybe<Scalars['String']['output']>;
  focusMode?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['ID']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  user: User;
  userId?: Maybe<Scalars['String']['output']>;
};

export type SettingUpdateInput = {
  cubeSessionId?: InputMaybe<Scalars['String']['input']>;
  cubeType?: InputMaybe<Scalars['String']['input']>;
  focusMode?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['String']['input'];
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type Solve = {
  __typename?: 'Solve';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  cubeSession: CubeSession;
  cubeSessionId?: Maybe<Scalars['String']['output']>;
  cubeType?: Maybe<Scalars['String']['output']>;
  dnf?: Maybe<Scalars['Boolean']['output']>;
  duration: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  plusTwo?: Maybe<Scalars['Boolean']['output']>;
  scramble?: Maybe<Scalars['String']['output']>;
  user: User;
  userId?: Maybe<Scalars['String']['output']>;
};

export type UpdateSolveInput = {
  cubeSessionId?: InputMaybe<Scalars['String']['input']>;
  cubeType?: InputMaybe<Scalars['String']['input']>;
  dnf?: InputMaybe<Scalars['Boolean']['input']>;
  duration?: InputMaybe<Scalars['Float']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  plusTwo?: InputMaybe<Scalars['Boolean']['input']>;
  scramble?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  cubeSessions: Array<CubeSession>;
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  image?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  password?: Maybe<Scalars['String']['output']>;
  setting: Setting;
  solves: Array<Solve>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type SolveTable_SolveFragment = { __typename?: 'Solve', id: string, duration: number, dnf?: boolean | null, plusTwo?: boolean | null } & { ' $fragmentName'?: 'SolveTable_SolveFragment' };

export type CreateSolveMutationVariables = Exact<{
  input: CreateSolveInput;
}>;


export type CreateSolveMutation = { __typename?: 'Mutation', createSolve: { __typename?: 'Solve', createdAt?: any | null, cubeSessionId?: string | null, cubeType?: string | null, dnf?: boolean | null, duration: number, id: string, notes?: string | null, plusTwo?: boolean | null, scramble?: string | null } };

export type DeleteSolveMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteSolveMutation = { __typename?: 'Mutation', deleteSolve: { __typename?: 'Solve', id: string, createdAt?: any | null, cubeSessionId?: string | null, scramble?: string | null, cubeType?: string | null, notes?: string | null, dnf?: boolean | null, plusTwo?: boolean | null, duration: number } };

export type UpdateSolveMutationVariables = Exact<{
  id: Scalars['String']['input'];
  input: UpdateSolveInput;
}>;


export type UpdateSolveMutation = { __typename?: 'Mutation', updateSolve: { __typename?: 'Solve', createdAt?: any | null, cubeSessionId?: string | null, cubeType?: string | null, dnf?: boolean | null, duration: number, id: string, notes?: string | null, plusTwo?: boolean | null, scramble?: string | null } };

export type SolvesQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type SolvesQueryQuery = { __typename?: 'Query', solves: Array<{ __typename?: 'Solve', createdAt?: any | null, cubeSessionId?: string | null, cubeType?: string | null, dnf?: boolean | null, duration: number, id: string, notes?: string | null, plusTwo?: boolean | null, scramble?: string | null }> };

export type SettingQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type SettingQueryQuery = { __typename?: 'Query', setting: { __typename?: 'Setting', cubeType?: string | null, cubeSessionId?: string | null, focusMode?: boolean | null, id: string } };

export const SolveTable_SolveFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SolveTable_Solve"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Solve"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"dnf"}},{"kind":"Field","name":{"kind":"Name","value":"plusTwo"}}]}}]} as unknown as DocumentNode<SolveTable_SolveFragment, unknown>;
export const CreateSolveDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createSolve"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateSolveInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createSolve"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"cubeSessionId"}},{"kind":"Field","name":{"kind":"Name","value":"cubeType"}},{"kind":"Field","name":{"kind":"Name","value":"dnf"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"plusTwo"}},{"kind":"Field","name":{"kind":"Name","value":"scramble"}}]}}]}}]} as unknown as DocumentNode<CreateSolveMutation, CreateSolveMutationVariables>;
export const DeleteSolveDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteSolve"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteSolve"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"cubeSessionId"}},{"kind":"Field","name":{"kind":"Name","value":"scramble"}},{"kind":"Field","name":{"kind":"Name","value":"cubeType"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"dnf"}},{"kind":"Field","name":{"kind":"Name","value":"plusTwo"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}}]}}]}}]} as unknown as DocumentNode<DeleteSolveMutation, DeleteSolveMutationVariables>;
export const UpdateSolveDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateSolve"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateSolveInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateSolve"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"cubeSessionId"}},{"kind":"Field","name":{"kind":"Name","value":"cubeType"}},{"kind":"Field","name":{"kind":"Name","value":"dnf"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"plusTwo"}},{"kind":"Field","name":{"kind":"Name","value":"scramble"}}]}}]}}]} as unknown as DocumentNode<UpdateSolveMutation, UpdateSolveMutationVariables>;
export const SolvesQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SolvesQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"solves"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"cubeSessionId"}},{"kind":"Field","name":{"kind":"Name","value":"cubeType"}},{"kind":"Field","name":{"kind":"Name","value":"dnf"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"plusTwo"}},{"kind":"Field","name":{"kind":"Name","value":"scramble"}}]}}]}}]} as unknown as DocumentNode<SolvesQueryQuery, SolvesQueryQueryVariables>;
export const SettingQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SettingQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"setting"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cubeType"}},{"kind":"Field","name":{"kind":"Name","value":"cubeSessionId"}},{"kind":"Field","name":{"kind":"Name","value":"focusMode"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<SettingQueryQuery, SettingQueryQueryVariables>;