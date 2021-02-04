/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: onReviewUpdated
// ====================================================

export interface onReviewUpdated_reviewUpdated_node_user_profile {
  __typename: "UserProfile";
  firstName: string | null;
  lastName: string | null;
  fullName: string | null;
  avatar: string | null;
}

export interface onReviewUpdated_reviewUpdated_node_user_auth_certificate {
  __typename: "CertificateAuth";
  serial: string | null;
}

export interface onReviewUpdated_reviewUpdated_node_user_auth_facebook {
  __typename: "FacebookAuth";
  fbId: string | null;
  displayName: string | null;
}

export interface onReviewUpdated_reviewUpdated_node_user_auth_google {
  __typename: "GoogleAuth";
  googleId: string | null;
  displayName: string | null;
}

export interface onReviewUpdated_reviewUpdated_node_user_auth_github {
  __typename: "GithubAuth";
  ghId: string | null;
  displayName: string | null;
}

export interface onReviewUpdated_reviewUpdated_node_user_auth_linkedin {
  __typename: "LinkedInAuth";
  lnId: string | null;
  displayName: string | null;
}

export interface onReviewUpdated_reviewUpdated_node_user_auth {
  __typename: "UserAuth";
  certificate: onReviewUpdated_reviewUpdated_node_user_auth_certificate | null;
  facebook: onReviewUpdated_reviewUpdated_node_user_auth_facebook | null;
  google: onReviewUpdated_reviewUpdated_node_user_auth_google | null;
  github: onReviewUpdated_reviewUpdated_node_user_auth_github | null;
  linkedin: onReviewUpdated_reviewUpdated_node_user_auth_linkedin | null;
}

export interface onReviewUpdated_reviewUpdated_node_user {
  __typename: "User";
  id: number;
  username: string;
  role: string;
  isActive: boolean | null;
  email: string;
  profile: onReviewUpdated_reviewUpdated_node_user_profile | null;
  auth: onReviewUpdated_reviewUpdated_node_user_auth | null;
}

export interface onReviewUpdated_reviewUpdated_node_modalReview {
  __typename: "ModalReview";
  modalName: string | null;
  modalId: number | null;
}

export interface onReviewUpdated_reviewUpdated_node_reviewMedia {
  __typename: "ReviewMedium";
  id: number | null;
  url: string | null;
  type: string | null;
}

export interface onReviewUpdated_reviewUpdated_node {
  __typename: "Review";
  id: number | null;
  user: onReviewUpdated_reviewUpdated_node_user | null;
  rating: string | null;
  feedback: string | null;
  isActive: boolean | null;
  helpful: number | null;
  modalReview: onReviewUpdated_reviewUpdated_node_modalReview | null;
  reviewMedia: (onReviewUpdated_reviewUpdated_node_reviewMedia | null)[] | null;
  createdAt: string;
  updatedAt: string;
}

export interface onReviewUpdated_reviewUpdated {
  __typename: "UpdateReviewPayload";
  mutation: string;
  node: onReviewUpdated_reviewUpdated_node | null;
}

export interface onReviewUpdated {
  reviewUpdated: onReviewUpdated_reviewUpdated | null;
}
