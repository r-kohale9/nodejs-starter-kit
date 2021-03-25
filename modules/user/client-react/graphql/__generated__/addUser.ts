/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AddUserInput } from "./../../../../../packages/server/__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: addUser
// ====================================================

export interface addUser_addUser_user_profile {
  __typename: "UserProfile";
  firstName: string | null;
  lastName: string | null;
  fullName: string | null;
  avatar: string | null;
}

export interface addUser_addUser_user_auth_certificate {
  __typename: "CertificateAuth";
  serial: string | null;
}

export interface addUser_addUser_user_auth_facebook {
  __typename: "FacebookAuth";
  fbId: string | null;
  displayName: string | null;
}

export interface addUser_addUser_user_auth_google {
  __typename: "GoogleAuth";
  googleId: string | null;
  displayName: string | null;
}

export interface addUser_addUser_user_auth_github {
  __typename: "GithubAuth";
  ghId: string | null;
  displayName: string | null;
}

export interface addUser_addUser_user_auth_linkedin {
  __typename: "LinkedInAuth";
  lnId: string | null;
  displayName: string | null;
}

export interface addUser_addUser_user_auth {
  __typename: "UserAuth";
  certificate: addUser_addUser_user_auth_certificate | null;
  facebook: addUser_addUser_user_auth_facebook | null;
  google: addUser_addUser_user_auth_google | null;
  github: addUser_addUser_user_auth_github | null;
  linkedin: addUser_addUser_user_auth_linkedin | null;
}

export interface addUser_addUser_user {
  __typename: "User";
  id: number;
  username: string;
  role: string;
  isActive: boolean | null;
  email: string;
  profile: addUser_addUser_user_profile | null;
  auth: addUser_addUser_user_auth | null;
}

export interface addUser_addUser {
  __typename: "UserPayload";
  user: addUser_addUser_user | null;
}

export interface addUser {
  addUser: addUser_addUser;
}

export interface addUserVariables {
  input: AddUserInput;
}
