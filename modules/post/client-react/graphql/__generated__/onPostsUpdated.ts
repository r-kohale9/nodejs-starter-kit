/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: onPostsUpdated
// ====================================================

export interface onPostsUpdated_postsUpdated_node {
  __typename: "Post";
  id: number;
  title: string;
  content: string;
}

export interface onPostsUpdated_postsUpdated {
  __typename: "UpdatePostPayload";
  mutation: string;
  node: onPostsUpdated_postsUpdated_node | null;
}

export interface onPostsUpdated {
  postsUpdated: onPostsUpdated_postsUpdated | null;
}

export interface onPostsUpdatedVariables {
  endCursor: number;
}
