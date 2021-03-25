/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: currentUser
// ====================================================

export interface currentUser_currentUser_profile {
  __typename: "UserProfile";
  firstName: string | null;
  lastName: string | null;
  fullName: string | null;
  avatar: string | null;
}

export interface currentUser_currentUser_auth_certificate {
  __typename: "CertificateAuth";
  serial: string | null;
}

export interface currentUser_currentUser_auth_facebook {
  __typename: "FacebookAuth";
  fbId: string | null;
  displayName: string | null;
}

export interface currentUser_currentUser_auth_google {
  __typename: "GoogleAuth";
  googleId: string | null;
  displayName: string | null;
}

export interface currentUser_currentUser_auth_github {
  __typename: "GithubAuth";
  ghId: string | null;
  displayName: string | null;
}

export interface currentUser_currentUser_auth_linkedin {
  __typename: "LinkedInAuth";
  lnId: string | null;
  displayName: string | null;
}

export interface currentUser_currentUser_auth {
  __typename: "UserAuth";
  certificate: currentUser_currentUser_auth_certificate | null;
  facebook: currentUser_currentUser_auth_facebook | null;
  google: currentUser_currentUser_auth_google | null;
  github: currentUser_currentUser_auth_github | null;
  linkedin: currentUser_currentUser_auth_linkedin | null;
}

export interface currentUser_currentUser {
  __typename: "User";
  id: number;
  username: string;
  role: string;
  isActive: boolean | null;
  email: string;
  profile: currentUser_currentUser_profile | null;
  auth: currentUser_currentUser_auth | null;
}

export interface currentUser {
  currentUser: currentUser_currentUser | null;
}
