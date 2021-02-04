/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LoginUserInput } from "./../../../../../packages/server/__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: login
// ====================================================

export interface login_login_tokens {
  __typename: "Tokens";
  accessToken: string | null;
  refreshToken: string | null;
}

export interface login_login_user_profile {
  __typename: "UserProfile";
  firstName: string | null;
  lastName: string | null;
  fullName: string | null;
  avatar: string | null;
}

export interface login_login_user_auth_certificate {
  __typename: "CertificateAuth";
  serial: string | null;
}

export interface login_login_user_auth_facebook {
  __typename: "FacebookAuth";
  fbId: string | null;
  displayName: string | null;
}

export interface login_login_user_auth_google {
  __typename: "GoogleAuth";
  googleId: string | null;
  displayName: string | null;
}

export interface login_login_user_auth_github {
  __typename: "GithubAuth";
  ghId: string | null;
  displayName: string | null;
}

export interface login_login_user_auth_linkedin {
  __typename: "LinkedInAuth";
  lnId: string | null;
  displayName: string | null;
}

export interface login_login_user_auth {
  __typename: "UserAuth";
  certificate: login_login_user_auth_certificate | null;
  facebook: login_login_user_auth_facebook | null;
  google: login_login_user_auth_google | null;
  github: login_login_user_auth_github | null;
  linkedin: login_login_user_auth_linkedin | null;
}

export interface login_login_user {
  __typename: "User";
  id: number;
  username: string;
  role: string;
  isActive: boolean | null;
  email: string;
  profile: login_login_user_profile | null;
  auth: login_login_user_auth | null;
}

export interface login_login {
  __typename: "AuthPayload";
  tokens: login_login_tokens | null;
  user: login_login_user | null;
}

export interface login {
  login: login_login;
}

export interface loginVariables {
  input: LoginUserInput;
}
