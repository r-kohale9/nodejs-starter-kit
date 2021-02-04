/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { FilterUserInput } from "./../../../../../packages/server/__generated__/globalTypes";

// ====================================================
// GraphQL subscription operation: onUsersUpdated
// ====================================================

export interface onUsersUpdated_usersUpdated_node_profile {
  __typename: "UserProfile";
  firstName: string | null;
  lastName: string | null;
  fullName: string | null;
  avatar: string | null;
}

export interface onUsersUpdated_usersUpdated_node_auth_certificate {
  __typename: "CertificateAuth";
  serial: string | null;
}

export interface onUsersUpdated_usersUpdated_node_auth_facebook {
  __typename: "FacebookAuth";
  fbId: string | null;
  displayName: string | null;
}

export interface onUsersUpdated_usersUpdated_node_auth_google {
  __typename: "GoogleAuth";
  googleId: string | null;
  displayName: string | null;
}

export interface onUsersUpdated_usersUpdated_node_auth_github {
  __typename: "GithubAuth";
  ghId: string | null;
  displayName: string | null;
}

export interface onUsersUpdated_usersUpdated_node_auth_linkedin {
  __typename: "LinkedInAuth";
  lnId: string | null;
  displayName: string | null;
}

export interface onUsersUpdated_usersUpdated_node_auth {
  __typename: "UserAuth";
  certificate: onUsersUpdated_usersUpdated_node_auth_certificate | null;
  facebook: onUsersUpdated_usersUpdated_node_auth_facebook | null;
  google: onUsersUpdated_usersUpdated_node_auth_google | null;
  github: onUsersUpdated_usersUpdated_node_auth_github | null;
  linkedin: onUsersUpdated_usersUpdated_node_auth_linkedin | null;
}

export interface onUsersUpdated_usersUpdated_node {
  __typename: "User";
  id: number;
  username: string;
  role: string;
  isActive: boolean | null;
  email: string;
  profile: onUsersUpdated_usersUpdated_node_profile | null;
  auth: onUsersUpdated_usersUpdated_node_auth | null;
}

export interface onUsersUpdated_usersUpdated {
  __typename: "UpdateUserPayload";
  mutation: string;
  node: onUsersUpdated_usersUpdated_node;
}

export interface onUsersUpdated {
  usersUpdated: onUsersUpdated_usersUpdated | null;
}

export interface onUsersUpdatedVariables {
  filter?: FilterUserInput | null;
}
