/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: user
// ====================================================

export interface user_user_user_profile {
  __typename: "UserProfile";
  firstName: string | null;
  lastName: string | null;
  fullName: string | null;
  avatar: string | null;
}

export interface user_user_user_auth_certificate {
  __typename: "CertificateAuth";
  serial: string | null;
}

export interface user_user_user_auth_facebook {
  __typename: "FacebookAuth";
  fbId: string | null;
  displayName: string | null;
}

export interface user_user_user_auth_google {
  __typename: "GoogleAuth";
  googleId: string | null;
  displayName: string | null;
}

export interface user_user_user_auth_github {
  __typename: "GithubAuth";
  ghId: string | null;
  displayName: string | null;
}

export interface user_user_user_auth_linkedin {
  __typename: "LinkedInAuth";
  lnId: string | null;
  displayName: string | null;
}

export interface user_user_user_auth {
  __typename: "UserAuth";
  certificate: user_user_user_auth_certificate | null;
  facebook: user_user_user_auth_facebook | null;
  google: user_user_user_auth_google | null;
  github: user_user_user_auth_github | null;
  linkedin: user_user_user_auth_linkedin | null;
}

export interface user_user_user {
  __typename: "User";
  id: number;
  username: string;
  role: string;
  isActive: boolean | null;
  email: string;
  profile: user_user_user_profile | null;
  auth: user_user_user_auth | null;
}

export interface user_user {
  __typename: "UserPayload";
  user: user_user_user | null;
}

export interface user {
  user: user_user | null;
}

export interface userVariables {
  id: number;
}
