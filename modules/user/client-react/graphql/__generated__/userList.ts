/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { FilterUserInput } from "./../../../../../packages/server/__generated__/globalTypes";

// ====================================================
// GraphQL query operation: userList
// ====================================================

export interface userList_userList_edges_node_profile {
  __typename: "UserProfile";
  firstName: string | null;
  lastName: string | null;
  fullName: string | null;
  avatar: string | null;
}

export interface userList_userList_edges_node_auth_certificate {
  __typename: "CertificateAuth";
  serial: string | null;
}

export interface userList_userList_edges_node_auth_facebook {
  __typename: "FacebookAuth";
  fbId: string | null;
  displayName: string | null;
}

export interface userList_userList_edges_node_auth_google {
  __typename: "GoogleAuth";
  googleId: string | null;
  displayName: string | null;
}

export interface userList_userList_edges_node_auth_github {
  __typename: "GithubAuth";
  ghId: string | null;
  displayName: string | null;
}

export interface userList_userList_edges_node_auth_linkedin {
  __typename: "LinkedInAuth";
  lnId: string | null;
  displayName: string | null;
}

export interface userList_userList_edges_node_auth {
  __typename: "UserAuth";
  certificate: userList_userList_edges_node_auth_certificate | null;
  facebook: userList_userList_edges_node_auth_facebook | null;
  google: userList_userList_edges_node_auth_google | null;
  github: userList_userList_edges_node_auth_github | null;
  linkedin: userList_userList_edges_node_auth_linkedin | null;
}

export interface userList_userList_edges_node {
  __typename: "User";
  id: number;
  username: string;
  role: string;
  isActive: boolean | null;
  email: string;
  profile: userList_userList_edges_node_profile | null;
  auth: userList_userList_edges_node_auth | null;
}

export interface userList_userList_edges {
  __typename: "UserEdges";
  cursor: number | null;
  node: userList_userList_edges_node | null;
}

export interface userList_userList_pageInfo {
  __typename: "UserPageInfo";
  endCursor: number | null;
  hasNextPage: boolean | null;
}

export interface userList_userList {
  __typename: "UserList";
  totalCount: number | null;
  edges: (userList_userList_edges | null)[] | null;
  pageInfo: userList_userList_pageInfo | null;
}

export interface userList {
  userList: userList_userList | null;
}

export interface userListVariables {
  limit: number;
  after?: number | null;
  filter?: FilterUserInput | null;
}
