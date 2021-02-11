/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EditUserInput } from "./../../../../../packages/server/__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: editUser
// ====================================================

export interface editUser_editUser_user_profile {
  __typename: "UserProfile";
  firstName: string | null;
  lastName: string | null;
  fullName: string | null;
  avatar: string | null;
}

export interface editUser_editUser_user_auth_certificate {
  __typename: "CertificateAuth";
  serial: string | null;
}

export interface editUser_editUser_user_auth_facebook {
  __typename: "FacebookAuth";
  fbId: string | null;
  displayName: string | null;
}

export interface editUser_editUser_user_auth_google {
  __typename: "GoogleAuth";
  googleId: string | null;
  displayName: string | null;
}

export interface editUser_editUser_user_auth_github {
  __typename: "GithubAuth";
  ghId: string | null;
  displayName: string | null;
}

export interface editUser_editUser_user_auth_linkedin {
  __typename: "LinkedInAuth";
  lnId: string | null;
  displayName: string | null;
}

export interface editUser_editUser_user_auth {
  __typename: "UserAuth";
  certificate: editUser_editUser_user_auth_certificate | null;
  facebook: editUser_editUser_user_auth_facebook | null;
  google: editUser_editUser_user_auth_google | null;
  github: editUser_editUser_user_auth_github | null;
  linkedin: editUser_editUser_user_auth_linkedin | null;
}

export interface editUser_editUser_user {
  __typename: "User";
  id: number;
  username: string;
  role: string;
  isActive: boolean | null;
  email: string;
  profile: editUser_editUser_user_profile | null;
  auth: editUser_editUser_user_auth | null;
}

export interface editUser_editUser {
  __typename: "UserPayload";
  user: editUser_editUser_user | null;
}

export interface editUser {
  editUser: editUser_editUser;
}

export interface editUserVariables {
  input: EditUserInput;
}
