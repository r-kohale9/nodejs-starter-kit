/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: UserInfo
// ====================================================

export interface UserInfo_profile {
  __typename: "UserProfile";
  firstName: string | null;
  lastName: string | null;
  fullName: string | null;
  avatar: string | null;
}

export interface UserInfo_auth_certificate {
  __typename: "CertificateAuth";
  serial: string | null;
}

export interface UserInfo_auth_facebook {
  __typename: "FacebookAuth";
  fbId: string | null;
  displayName: string | null;
}

export interface UserInfo_auth_google {
  __typename: "GoogleAuth";
  googleId: string | null;
  displayName: string | null;
}

export interface UserInfo_auth_github {
  __typename: "GithubAuth";
  ghId: string | null;
  displayName: string | null;
}

export interface UserInfo_auth_linkedin {
  __typename: "LinkedInAuth";
  lnId: string | null;
  displayName: string | null;
}

export interface UserInfo_auth {
  __typename: "UserAuth";
  certificate: UserInfo_auth_certificate | null;
  facebook: UserInfo_auth_facebook | null;
  google: UserInfo_auth_google | null;
  github: UserInfo_auth_github | null;
  linkedin: UserInfo_auth_linkedin | null;
}

export interface UserInfo {
  __typename: "User";
  id: number;
  username: string;
  role: string;
  isActive: boolean | null;
  email: string;
  profile: UserInfo_profile | null;
  auth: UserInfo_auth | null;
}
