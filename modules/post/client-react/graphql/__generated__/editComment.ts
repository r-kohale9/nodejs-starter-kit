/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EditCommentInput } from "./../../../../../packages/server/__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: editComment
// ====================================================

export interface editComment_editComment {
  __typename: "Comment";
  id: number;
  content: string;
}

export interface editComment {
  editComment: editComment_editComment | null;
}

export interface editCommentVariables {
  input: EditCommentInput;
}
