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
    "\n  fragment SolveTable_Solve on Solve {\n    id\n    duration\n    dnf\n    plusTwo\n  }\n": types.SolveTable_SolveFragmentDoc,
    "\n  mutation createSolve($input: CreateSolveInput!) {\n    createSolve(input: $input) {\n      createdAt\n      cubeSessionId\n      cubeType\n      dnf\n      duration\n      id\n      notes\n      plusTwo\n      scramble\n    }\n  }\n": types.CreateSolveDocument,
    "\n  mutation deleteSolve($id: String!) {\n    deleteSolve(id: $id) {\n      id\n      createdAt\n      cubeSessionId\n      scramble\n      cubeType\n      notes\n      dnf\n      plusTwo\n      duration\n    }\n  }\n": types.DeleteSolveDocument,
    "\n  mutation updateSolve($id: String!, $input: UpdateSolveInput!) {\n    updateSolve(id: $id, input: $input) {\n      createdAt\n      cubeSessionId\n      cubeType\n      dnf\n      duration\n      id\n      notes\n      plusTwo\n      scramble\n    }\n  }\n": types.UpdateSolveDocument,
    "\n  query SolvesQuery {\n    solves {\n      createdAt\n      cubeSessionId\n      cubeType\n      dnf\n      duration\n      id\n      notes\n      plusTwo\n      scramble\n    }\n  }\n": types.SolvesQueryDocument,
    "\n  query SettingQuery {\n    setting {\n      cubeType\n      cubeSessionId\n      focusMode\n      id\n    }\n  }\n": types.SettingQueryDocument,
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
export function graphql(source: "\n  fragment SolveTable_Solve on Solve {\n    id\n    duration\n    dnf\n    plusTwo\n  }\n"): (typeof documents)["\n  fragment SolveTable_Solve on Solve {\n    id\n    duration\n    dnf\n    plusTwo\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createSolve($input: CreateSolveInput!) {\n    createSolve(input: $input) {\n      createdAt\n      cubeSessionId\n      cubeType\n      dnf\n      duration\n      id\n      notes\n      plusTwo\n      scramble\n    }\n  }\n"): (typeof documents)["\n  mutation createSolve($input: CreateSolveInput!) {\n    createSolve(input: $input) {\n      createdAt\n      cubeSessionId\n      cubeType\n      dnf\n      duration\n      id\n      notes\n      plusTwo\n      scramble\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation deleteSolve($id: String!) {\n    deleteSolve(id: $id) {\n      id\n      createdAt\n      cubeSessionId\n      scramble\n      cubeType\n      notes\n      dnf\n      plusTwo\n      duration\n    }\n  }\n"): (typeof documents)["\n  mutation deleteSolve($id: String!) {\n    deleteSolve(id: $id) {\n      id\n      createdAt\n      cubeSessionId\n      scramble\n      cubeType\n      notes\n      dnf\n      plusTwo\n      duration\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateSolve($id: String!, $input: UpdateSolveInput!) {\n    updateSolve(id: $id, input: $input) {\n      createdAt\n      cubeSessionId\n      cubeType\n      dnf\n      duration\n      id\n      notes\n      plusTwo\n      scramble\n    }\n  }\n"): (typeof documents)["\n  mutation updateSolve($id: String!, $input: UpdateSolveInput!) {\n    updateSolve(id: $id, input: $input) {\n      createdAt\n      cubeSessionId\n      cubeType\n      dnf\n      duration\n      id\n      notes\n      plusTwo\n      scramble\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query SolvesQuery {\n    solves {\n      createdAt\n      cubeSessionId\n      cubeType\n      dnf\n      duration\n      id\n      notes\n      plusTwo\n      scramble\n    }\n  }\n"): (typeof documents)["\n  query SolvesQuery {\n    solves {\n      createdAt\n      cubeSessionId\n      cubeType\n      dnf\n      duration\n      id\n      notes\n      plusTwo\n      scramble\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query SettingQuery {\n    setting {\n      cubeType\n      cubeSessionId\n      focusMode\n      id\n    }\n  }\n"): (typeof documents)["\n  query SettingQuery {\n    setting {\n      cubeType\n      cubeSessionId\n      focusMode\n      id\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;