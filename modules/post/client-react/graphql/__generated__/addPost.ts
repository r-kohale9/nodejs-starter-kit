/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AddPostInput } from "./../../../../../packages/server/__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: addPost
// ====================================================

export interface addPost_addPost_comments {
  __typename: "Comment";
  id: number;
  content: string;
}

export interface addPost_addPost {
  __typename: "Post";
  id: number;
  title: string;
  content: string;
  comments: (addPost_addPost_comments | null)[] | null;
}

export interface addPost {
  addPost: addPost_addPost | null;
}

export interface addPostVariables {
  input: AddPostInput;
}
