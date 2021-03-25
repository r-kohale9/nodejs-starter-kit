/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AddCommentInput } from "./../../../../../packages/server/__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: addComment
// ====================================================

export interface addComment_addComment {
  __typename: "Comment";
  id: number;
  content: string;
}

export interface addComment {
  addComment: addComment_addComment | null;
}

export interface addCommentVariables {
  input: AddCommentInput;
}
