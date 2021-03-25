/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EditPostInput } from "./../../../../../packages/server/__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: editPost
// ====================================================

export interface editPost_editPost {
  __typename: "Post";
  id: number;
  title: string;
  content: string;
}

export interface editPost {
  editPost: editPost_editPost | null;
}

export interface editPostVariables {
  input: EditPostInput;
}
