/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: filesQuery
// ====================================================

export interface filesQuery_files {
  __typename: "File";
  id: number;
  name: string;
  type: string;
  size: number;
  path: string;
}

export interface filesQuery {
  files: (filesQuery_files | null)[] | null;
}
