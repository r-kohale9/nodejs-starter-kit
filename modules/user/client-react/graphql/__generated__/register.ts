/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RegisterUserInput } from "./../../../../../packages/server/__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: register
// ====================================================

export interface register_register_user_profile {
  __typename: "UserProfile";
  firstName: string | null;
  lastName: string | null;
  fullName: string | null;
  avatar: string | null;
}

export interface register_register_user_auth_certificate {
  __typename: "CertificateAuth";
  serial: string | null;
}

export interface register_register_user_auth_facebook {
  __typename: "FacebookAuth";
  fbId: string | null;
  displayName: string | null;
}

export interface register_register_user_auth_google {
  __typename: "GoogleAuth";
  googleId: string | null;
  displayName: string | null;
}

export interface register_register_user_auth_github {
  __typename: "GithubAuth";
  ghId: string | null;
  displayName: string | null;
}

export interface register_register_user_auth_linkedin {
  __typename: "LinkedInAuth";
  lnId: string | null;
  displayName: string | null;
}

export interface register_register_user_auth {
  __typename: "UserAuth";
  certificate: register_register_user_auth_certificate | null;
  facebook: register_register_user_auth_facebook | null;
  google: register_register_user_auth_google | null;
  github: register_register_user_auth_github | null;
  linkedin: register_register_user_auth_linkedin | null;
}

export interface register_register_user {
  __typename: "User";
  id: number;
  username: string;
  role: string;
  isActive: boolean | null;
  email: string;
  profile: register_register_user_profile | null;
  auth: register_register_user_auth | null;
}

export interface register_register {
  __typename: "UserPayload";
  user: register_register_user | null;
}

export interface register {
  register: register_register;
}

export interface registerVariables {
  input: RegisterUserInput;
}
