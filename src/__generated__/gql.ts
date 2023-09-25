/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  fragment Solve on Solve {\n    id\n    duration\n    createdAt\n    dnf\n    plusTwo\n    scramble\n    cubeType\n    cubeSessionId\n    notes\n  }\n": types.SolveFragmentDoc,
    "\n  fragment CubeSession on CubeSession {\n    id\n    createdAt\n    name\n    cubeType\n    notes\n  }\n": types.CubeSessionFragmentDoc,
    "\n  mutation createSolve($input: CreateSolveInput!) {\n    createSolve(input: $input) {\n      ...Solve\n    }\n  }\n": types.CreateSolveDocument,
    "\n  mutation deleteSolve($id: String!) {\n    deleteSolve(id: $id) {\n      id\n    }\n  }\n": types.DeleteSolveDocument,
    "\n  mutation updateSolve($id: String!, $input: UpdateSolveInput!) {\n    updateSolve(id: $id, input: $input) {\n      ...Solve\n    }\n  }\n": types.UpdateSolveDocument,
    "\n  mutation updateSetting($input: UpdateSettingInput!) {\n    updateSetting(input: $input) {\n      id\n      focusMode\n      cubeType\n      barView\n      cubeDisplayDimension\n      cubeSessionId\n    }\n  }\n": types.UpdateSettingDocument,
    "\n  mutation createCubeSession($input: CubeSessionInput!) {\n    createCubeSession(input: $input) {\n      ...CubeSession\n    }\n  }\n": types.CreateCubeSessionDocument,
    "\n  mutation updateCubeSession($id: String!, $input: CubeSessionUpdateInput!) {\n    updateCubeSession(id: $id, input: $input) {\n      id\n      name\n      createdAt\n      cubeType\n      notes\n    }\n  }\n": types.UpdateCubeSessionDocument,
    "\n  mutation deleteCubeSession($id: String!) {\n    deleteCubeSession(id: $id) {\n      id\n    }\n  }\n": types.DeleteCubeSessionDocument,
    "\n  query SolvesQuery {\n    solves {\n      createdAt\n      cubeSessionId\n      cubeType\n      dnf\n      duration\n      id\n      notes\n      plusTwo\n      scramble\n    }\n  }\n": types.SolvesQueryDocument,
    "\n  query Solve {\n    solve {\n      createdAt\n      cubeSessionId\n      cubeType\n      dnf\n      duration\n      id\n      notes\n      plusTwo\n      scramble\n    }\n  }\n": types.SolveDocument,
    "\n  query SettingQuery {\n    setting {\n      cubeType\n      cubeSessionId\n      cubeDisplayDimension\n      barView\n      focusMode\n      id\n    }\n  }\n": types.SettingQueryDocument,
    "\n  query CubeSessions {\n    cubeSessions {\n      id\n      createdAt\n      name\n      notes\n      cubeType\n    }\n  }\n": types.CubeSessionsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment Solve on Solve {\n    id\n    duration\n    createdAt\n    dnf\n    plusTwo\n    scramble\n    cubeType\n    cubeSessionId\n    notes\n  }\n"): (typeof documents)["\n  fragment Solve on Solve {\n    id\n    duration\n    createdAt\n    dnf\n    plusTwo\n    scramble\n    cubeType\n    cubeSessionId\n    notes\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment CubeSession on CubeSession {\n    id\n    createdAt\n    name\n    cubeType\n    notes\n  }\n"): (typeof documents)["\n  fragment CubeSession on CubeSession {\n    id\n    createdAt\n    name\n    cubeType\n    notes\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createSolve($input: CreateSolveInput!) {\n    createSolve(input: $input) {\n      ...Solve\n    }\n  }\n"): (typeof documents)["\n  mutation createSolve($input: CreateSolveInput!) {\n    createSolve(input: $input) {\n      ...Solve\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation deleteSolve($id: String!) {\n    deleteSolve(id: $id) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation deleteSolve($id: String!) {\n    deleteSolve(id: $id) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateSolve($id: String!, $input: UpdateSolveInput!) {\n    updateSolve(id: $id, input: $input) {\n      ...Solve\n    }\n  }\n"): (typeof documents)["\n  mutation updateSolve($id: String!, $input: UpdateSolveInput!) {\n    updateSolve(id: $id, input: $input) {\n      ...Solve\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateSetting($input: UpdateSettingInput!) {\n    updateSetting(input: $input) {\n      id\n      focusMode\n      cubeType\n      barView\n      cubeDisplayDimension\n      cubeSessionId\n    }\n  }\n"): (typeof documents)["\n  mutation updateSetting($input: UpdateSettingInput!) {\n    updateSetting(input: $input) {\n      id\n      focusMode\n      cubeType\n      barView\n      cubeDisplayDimension\n      cubeSessionId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createCubeSession($input: CubeSessionInput!) {\n    createCubeSession(input: $input) {\n      ...CubeSession\n    }\n  }\n"): (typeof documents)["\n  mutation createCubeSession($input: CubeSessionInput!) {\n    createCubeSession(input: $input) {\n      ...CubeSession\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateCubeSession($id: String!, $input: CubeSessionUpdateInput!) {\n    updateCubeSession(id: $id, input: $input) {\n      id\n      name\n      createdAt\n      cubeType\n      notes\n    }\n  }\n"): (typeof documents)["\n  mutation updateCubeSession($id: String!, $input: CubeSessionUpdateInput!) {\n    updateCubeSession(id: $id, input: $input) {\n      id\n      name\n      createdAt\n      cubeType\n      notes\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation deleteCubeSession($id: String!) {\n    deleteCubeSession(id: $id) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation deleteCubeSession($id: String!) {\n    deleteCubeSession(id: $id) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query SolvesQuery {\n    solves {\n      createdAt\n      cubeSessionId\n      cubeType\n      dnf\n      duration\n      id\n      notes\n      plusTwo\n      scramble\n    }\n  }\n"): (typeof documents)["\n  query SolvesQuery {\n    solves {\n      createdAt\n      cubeSessionId\n      cubeType\n      dnf\n      duration\n      id\n      notes\n      plusTwo\n      scramble\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Solve {\n    solve {\n      createdAt\n      cubeSessionId\n      cubeType\n      dnf\n      duration\n      id\n      notes\n      plusTwo\n      scramble\n    }\n  }\n"): (typeof documents)["\n  query Solve {\n    solve {\n      createdAt\n      cubeSessionId\n      cubeType\n      dnf\n      duration\n      id\n      notes\n      plusTwo\n      scramble\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query SettingQuery {\n    setting {\n      cubeType\n      cubeSessionId\n      cubeDisplayDimension\n      barView\n      focusMode\n      id\n    }\n  }\n"): (typeof documents)["\n  query SettingQuery {\n    setting {\n      cubeType\n      cubeSessionId\n      cubeDisplayDimension\n      barView\n      focusMode\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query CubeSessions {\n    cubeSessions {\n      id\n      createdAt\n      name\n      notes\n      cubeType\n    }\n  }\n"): (typeof documents)["\n  query CubeSessions {\n    cubeSessions {\n      id\n      createdAt\n      name\n      notes\n      cubeType\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;