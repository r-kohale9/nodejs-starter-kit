/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DeleteCommentInput } from "./../../../../../packages/server/__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: deleteComment
// ====================================================

export interface deleteComment_deleteComment {
  __typename: "Comment";
  id: number;
}

export interface deleteComment {
  deleteComment: deleteComment_deleteComment | null;
}

export interface deleteCommentVariables {
  input: DeleteCommentInput;
}
