/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: post
// ====================================================

export interface post_post_comments {
  __typename: "Comment";
  id: number;
  content: string;
}

export interface post_post {
  __typename: "Post";
  id: number;
  title: string;
  content: string;
  comments: (post_post_comments | null)[] | null;
}

export interface post {
  post: post_post | null;
}

export interface postVariables {
  id: number;
}
