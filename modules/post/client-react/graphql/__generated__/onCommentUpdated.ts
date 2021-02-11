/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: onCommentUpdated
// ====================================================

export interface onCommentUpdated_commentUpdated_node {
  __typename: "Comment";
  id: number;
  content: string;
}

export interface onCommentUpdated_commentUpdated {
  __typename: "UpdateCommentPayload";
  mutation: string;
  id: number | null;
  postId: number;
  node: onCommentUpdated_commentUpdated_node | null;
}

export interface onCommentUpdated {
  commentUpdated: onCommentUpdated_commentUpdated | null;
}

export interface onCommentUpdatedVariables {
  postId: number;
}
