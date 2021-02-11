/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { OrderByReviewInput, FilterReviewInput } from "./../../../../../packages/server/__generated__/globalTypes";

// ====================================================
// GraphQL query operation: reviews
// ====================================================

export interface reviews_reviews_edges_node_user_profile {
  __typename: "UserProfile";
  firstName: string | null;
  lastName: string | null;
  fullName: string | null;
  avatar: string | null;
}

export interface reviews_reviews_edges_node_user_auth_certificate {
  __typename: "CertificateAuth";
  serial: string | null;
}

export interface reviews_reviews_edges_node_user_auth_facebook {
  __typename: "FacebookAuth";
  fbId: string | null;
  displayName: string | null;
}

export interface reviews_reviews_edges_node_user_auth_google {
  __typename: "GoogleAuth";
  googleId: string | null;
  displayName: string | null;
}

export interface reviews_reviews_edges_node_user_auth_github {
  __typename: "GithubAuth";
  ghId: string | null;
  displayName: string | null;
}

export interface reviews_reviews_edges_node_user_auth_linkedin {
  __typename: "LinkedInAuth";
  lnId: string | null;
  displayName: string | null;
}

export interface reviews_reviews_edges_node_user_auth {
  __typename: "UserAuth";
  certificate: reviews_reviews_edges_node_user_auth_certificate | null;
  facebook: reviews_reviews_edges_node_user_auth_facebook | null;
  google: reviews_reviews_edges_node_user_auth_google | null;
  github: reviews_reviews_edges_node_user_auth_github | null;
  linkedin: reviews_reviews_edges_node_user_auth_linkedin | null;
}

export interface reviews_reviews_edges_node_user {
  __typename: "User";
  id: number;
  username: string;
  role: string;
  isActive: boolean | null;
  email: string;
  profile: reviews_reviews_edges_node_user_profile | null;
  auth: reviews_reviews_edges_node_user_auth | null;
}

export interface reviews_reviews_edges_node_modalReview {
  __typename: "ModalReview";
  modalName: string | null;
  modalId: number | null;
}

export interface reviews_reviews_edges_node_reviewMedia {
  __typename: "ReviewMedium";
  id: number | null;
  url: string | null;
  type: string | null;
}

export interface reviews_reviews_edges_node {
  __typename: "Review";
  id: number | null;
  user: reviews_reviews_edges_node_user | null;
  rating: string | null;
  feedback: string | null;
  isActive: boolean | null;
  helpful: number | null;
  modalReview: reviews_reviews_edges_node_modalReview | null;
  reviewMedia: (reviews_reviews_edges_node_reviewMedia | null)[] | null;
  createdAt: string;
  updatedAt: string;
}

export interface reviews_reviews_edges {
  __typename: "ReviewEdges";
  cursor: number | null;
  node: reviews_reviews_edges_node | null;
}

export interface reviews_reviews_pageInfo {
  __typename: "ReviewPageInfo";
  endCursor: number | null;
  hasNextPage: boolean | null;
}

export interface reviews_reviews {
  __typename: "Reviews";
  totalCount: number | null;
  edges: (reviews_reviews_edges | null)[] | null;
  pageInfo: reviews_reviews_pageInfo | null;
}

export interface reviews {
  reviews: reviews_reviews | null;
}

export interface reviewsVariables {
  limit: number;
  after?: number | null;
  orderBy?: OrderByReviewInput | null;
  filter?: FilterReviewInput | null;
}
