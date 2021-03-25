/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: onPostUpdated
// ====================================================

export interface onPostUpdated_postUpdated_node {
  __typename: "Post";
  id: number;
  title: string;
  content: string;
}

export interface onPostUpdated_postUpdated {
  __typename: "UpdatePostPayload";
  mutation: string;
  id: number;
  node: onPostUpdated_postUpdated_node | null;
}

export interface onPostUpdated {
  postUpdated: onPostUpdated_postUpdated | null;
}

export interface onPostUpdatedVariables {
  id: number;
}
