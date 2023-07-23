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

export type AccountCreateWithoutUserInput = {
  accessToken?: InputMaybe<Scalars['String']['input']>;
  accessTokenExpires?: InputMaybe<Scalars['DateTime']['input']>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  providerAccountId: Scalars['String']['input'];
  providerId: Scalars['String']['input'];
  providerType: Scalars['String']['input'];
  refreshToken?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type AccountUniqueFilter = {
  id?: InputMaybe<Scalars['String']['input']>;
  providerAccountId?: InputMaybe<Scalars['String']['input']>;
  providerId?: InputMaybe<Scalars['String']['input']>;
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

export type CubeSessionCreateSolvesRelationInput = {
  connect?: InputMaybe<Array<SolveUniqueFilter>>;
  create?: InputMaybe<Array<SolveCreateWithoutCubeSessionInput>>;
};

export type CubeSessionCreateUserRelationInput = {
  connect?: InputMaybe<UserUniqueFilter>;
  create?: InputMaybe<UserCreateWithoutCubeSessionsInput>;
};

export type CubeSessionCreateWithoutSolvesInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  notes?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
  user?: InputMaybe<CubeSessionCreateUserRelationInput>;
};

export type CubeSessionCreateWithoutUserInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  notes?: InputMaybe<Scalars['String']['input']>;
  solves?: InputMaybe<CubeSessionCreateSolvesRelationInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type CubeSessionInput = {
  name: Scalars['String']['input'];
  notes?: InputMaybe<Scalars['String']['input']>;
  userId: Scalars['String']['input'];
};

export type CubeSessionUniqueFilter = {
  id?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createCubeSession: CubeSession;
  createSolve: Solve;
  deleteCubeSession: CubeSession;
  deleteSolve: Solve;
  deleteUser: User;
  updateCubeSession: CubeSession;
  updateSetting: Setting;
  updateSolve: Solve;
  updateUser: User;
};


export type MutationCreateCubeSessionArgs = {
  name?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCreateSolveArgs = {
  input: SolveCreateInput;
};


export type MutationDeleteCubeSessionArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationDeleteSolveArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationDeleteUserArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationUpdateCubeSessionArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateSettingArgs = {
  cubeSessionId?: InputMaybe<Scalars['String']['input']>;
  cubeType?: InputMaybe<Scalars['String']['input']>;
  focusMode?: InputMaybe<Scalars['Boolean']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateSolveArgs = {
  cubeSessionId?: InputMaybe<Scalars['String']['input']>;
  cubeType?: InputMaybe<Scalars['String']['input']>;
  dnf?: InputMaybe<Scalars['Boolean']['input']>;
  duration?: InputMaybe<Scalars['Float']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  plusTwo?: InputMaybe<Scalars['Boolean']['input']>;
  scramble?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateUserArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
};

export type Query = {
  __typename?: 'Query';
  cubeSessionSolves: Array<Solve>;
  setting: Setting;
  solve: Solve;
  solves: Array<Solve>;
  userCubeSessions: Array<CubeSession>;
};


export type QueryCubeSessionSolvesArgs = {
  id?: InputMaybe<Scalars['String']['input']>;
};


export type QuerySettingArgs = {
  userId?: InputMaybe<Scalars['String']['input']>;
};


export type QuerySolveArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type QuerySolvesArgs = {
  userId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryUserCubeSessionsArgs = {
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type SessionCreateWithoutUserInput = {
  accessToken: Scalars['String']['input'];
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  expires: Scalars['DateTime']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  sessionToken: Scalars['String']['input'];
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type SessionUniqueFilter = {
  accessToken?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  sessionToken?: InputMaybe<Scalars['String']['input']>;
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

export type SettingCreateWithoutUserInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  cubeSessionId?: InputMaybe<Scalars['String']['input']>;
  cubeType?: InputMaybe<Scalars['String']['input']>;
  focusMode?: InputMaybe<Scalars['Boolean']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type SettingUniqueFilter = {
  id?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type Solve = {
  __typename?: 'Solve';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  cubeSession: CubeSession;
  cubeSessionId?: Maybe<Scalars['String']['output']>;
  cubeType?: Maybe<Scalars['String']['output']>;
  dnf?: Maybe<Scalars['Boolean']['output']>;
  duration?: Maybe<Scalars['Float']['output']>;
  id: Scalars['ID']['output'];
  notes?: Maybe<Scalars['String']['output']>;
  plusTwo?: Maybe<Scalars['Boolean']['output']>;
  scramble?: Maybe<Scalars['String']['output']>;
  user: User;
  userId?: Maybe<Scalars['String']['output']>;
};

export type SolveCreateCubeSessionRelationInput = {
  connect?: InputMaybe<CubeSessionUniqueFilter>;
  create?: InputMaybe<CubeSessionCreateWithoutSolvesInput>;
};

export type SolveCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  cubeSession?: InputMaybe<SolveCreateCubeSessionRelationInput>;
  cubeType: Scalars['String']['input'];
  dnf?: InputMaybe<Scalars['Boolean']['input']>;
  duration: Scalars['Float']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  plusTwo?: InputMaybe<Scalars['Boolean']['input']>;
  scramble?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<SolveCreateUserRelationInput>;
};

export type SolveCreateUserRelationInput = {
  connect?: InputMaybe<UserUniqueFilter>;
  create?: InputMaybe<UserCreateWithoutSolvesInput>;
};

export type SolveCreateWithoutCubeSessionInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  cubeType: Scalars['String']['input'];
  dnf?: InputMaybe<Scalars['Boolean']['input']>;
  duration: Scalars['Float']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  plusTwo?: InputMaybe<Scalars['Boolean']['input']>;
  scramble?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<SolveCreateUserRelationInput>;
};

export type SolveCreateWithoutUserInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  cubeSession?: InputMaybe<SolveCreateCubeSessionRelationInput>;
  cubeType: Scalars['String']['input'];
  dnf?: InputMaybe<Scalars['Boolean']['input']>;
  duration: Scalars['Float']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  plusTwo?: InputMaybe<Scalars['Boolean']['input']>;
  scramble?: InputMaybe<Scalars['String']['input']>;
};

export type SolveInput = {
  cubeSessionId?: InputMaybe<Scalars['String']['input']>;
  cubeType?: InputMaybe<Scalars['String']['input']>;
  dnf?: InputMaybe<Scalars['Boolean']['input']>;
  duration?: InputMaybe<Scalars['Float']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  plusTwo?: InputMaybe<Scalars['Boolean']['input']>;
  scramble?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type SolveUniqueFilter = {
  id?: InputMaybe<Scalars['String']['input']>;
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

export type UserCreateAccountsRelationInput = {
  connect?: InputMaybe<Array<AccountUniqueFilter>>;
  create?: InputMaybe<Array<AccountCreateWithoutUserInput>>;
};

export type UserCreateCubeSessionsRelationInput = {
  connect?: InputMaybe<Array<CubeSessionUniqueFilter>>;
  create?: InputMaybe<Array<CubeSessionCreateWithoutUserInput>>;
};

export type UserCreateSessionsRelationInput = {
  connect?: InputMaybe<Array<SessionUniqueFilter>>;
  create?: InputMaybe<Array<SessionCreateWithoutUserInput>>;
};

export type UserCreateSettingRelationInput = {
  connect?: InputMaybe<SettingUniqueFilter>;
  create?: InputMaybe<SettingCreateWithoutUserInput>;
};

export type UserCreateSolvesRelationInput = {
  connect?: InputMaybe<Array<SolveUniqueFilter>>;
  create?: InputMaybe<Array<SolveCreateWithoutUserInput>>;
};

export type UserCreateWithoutCubeSessionsInput = {
  accounts?: InputMaybe<UserCreateAccountsRelationInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  emailVerified?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  sessions?: InputMaybe<UserCreateSessionsRelationInput>;
  setting?: InputMaybe<UserCreateSettingRelationInput>;
  solves?: InputMaybe<UserCreateSolvesRelationInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UserCreateWithoutSolvesInput = {
  accounts?: InputMaybe<UserCreateAccountsRelationInput>;
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  cubeSessions?: InputMaybe<UserCreateCubeSessionsRelationInput>;
  email?: InputMaybe<Scalars['String']['input']>;
  emailVerified?: InputMaybe<Scalars['DateTime']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  sessions?: InputMaybe<UserCreateSessionsRelationInput>;
  setting?: InputMaybe<UserCreateSettingRelationInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UserUniqueFilter = {
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
};

export type SolvesQueryVariables = Exact<{
  userId: Scalars['String']['input'];
}>;


export type SolvesQuery = { __typename?: 'Query', solves: Array<{ __typename?: 'Solve', createdAt?: any | null, cubeSessionId?: string | null, cubeType?: string | null, dnf?: boolean | null, duration?: number | null, id: string, notes?: string | null, plusTwo?: boolean | null, scramble?: string | null }> };

export type SettingQueryVariables = Exact<{
  userId: Scalars['String']['input'];
}>;


export type SettingQuery = { __typename?: 'Query', setting: { __typename?: 'Setting', cubeType?: string | null, cubeSessionId?: string | null, focusMode?: boolean | null, id: string } };


export const SolvesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Solves"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"solves"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"cubeSessionId"}},{"kind":"Field","name":{"kind":"Name","value":"cubeType"}},{"kind":"Field","name":{"kind":"Name","value":"dnf"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"plusTwo"}},{"kind":"Field","name":{"kind":"Name","value":"scramble"}}]}}]}}]} as unknown as DocumentNode<SolvesQuery, SolvesQueryVariables>;
export const SettingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Setting"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"setting"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cubeType"}},{"kind":"Field","name":{"kind":"Name","value":"cubeSessionId"}},{"kind":"Field","name":{"kind":"Name","value":"focusMode"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<SettingQuery, SettingQueryVariables>;