/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { OrderByUserInput, FilterUserInput } from "./../../../../../packages/server/__generated__/globalTypes";

// ====================================================
// GraphQL query operation: users
// ====================================================

export interface users_users_profile {
  __typename: "UserProfile";
  firstName: string | null;
  lastName: string | null;
  fullName: string | null;
  avatar: string | null;
}

export interface users_users_auth_certificate {
  __typename: "CertificateAuth";
  serial: string | null;
}

export interface users_users_auth_facebook {
  __typename: "FacebookAuth";
  fbId: string | null;
  displayName: string | null;
}

export interface users_users_auth_google {
  __typename: "GoogleAuth";
  googleId: string | null;
  displayName: string | null;
}

export interface users_users_auth_github {
  __typename: "GithubAuth";
  ghId: string | null;
  displayName: string | null;
}

export interface users_users_auth_linkedin {
  __typename: "LinkedInAuth";
  lnId: string | null;
  displayName: string | null;
}

export interface users_users_auth {
  __typename: "UserAuth";
  certificate: users_users_auth_certificate | null;
  facebook: users_users_auth_facebook | null;
  google: users_users_auth_google | null;
  github: users_users_auth_github | null;
  linkedin: users_users_auth_linkedin | null;
}

export interface users_users {
  __typename: "User";
  id: number;
  username: string;
  role: string;
  isActive: boolean | null;
  email: string;
  profile: users_users_profile | null;
  auth: users_users_auth | null;
}

export interface users {
  users: (users_users | null)[] | null;
}

export interface usersVariables {
  orderBy?: OrderByUserInput | null;
  filter?: FilterUserInput | null;
}
