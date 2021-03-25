/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: deleteUser
// ====================================================

export interface deleteUser_deleteUser_user {
  __typename: "User";
  id: number;
}

export interface deleteUser_deleteUser {
  __typename: "UserPayload";
  user: deleteUser_deleteUser_user | null;
}

export interface deleteUser {
  deleteUser: deleteUser_deleteUser;
}

export interface deleteUserVariables {
  id: number;
}
