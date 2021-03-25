/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: review
// ====================================================

export interface review_review_user_profile {
  __typename: "UserProfile";
  firstName: string | null;
  lastName: string | null;
  fullName: string | null;
  avatar: string | null;
}

export interface review_review_user_auth_certificate {
  __typename: "CertificateAuth";
  serial: string | null;
}

export interface review_review_user_auth_facebook {
  __typename: "FacebookAuth";
  fbId: string | null;
  displayName: string | null;
}

export interface review_review_user_auth_google {
  __typename: "GoogleAuth";
  googleId: string | null;
  displayName: string | null;
}

export interface review_review_user_auth_github {
  __typename: "GithubAuth";
  ghId: string | null;
  displayName: string | null;
}

export interface review_review_user_auth_linkedin {
  __typename: "LinkedInAuth";
  lnId: string | null;
  displayName: string | null;
}

export interface review_review_user_auth {
  __typename: "UserAuth";
  certificate: review_review_user_auth_certificate | null;
  facebook: review_review_user_auth_facebook | null;
  google: review_review_user_auth_google | null;
  github: review_review_user_auth_github | null;
  linkedin: review_review_user_auth_linkedin | null;
}

export interface review_review_user {
  __typename: "User";
  id: number;
  username: string;
  role: string;
  isActive: boolean | null;
  email: string;
  profile: review_review_user_profile | null;
  auth: review_review_user_auth | null;
}

export interface review_review_modalReview {
  __typename: "ModalReview";
  modalName: string | null;
  modalId: number | null;
}

export interface review_review_reviewMedia {
  __typename: "ReviewMedium";
  id: number | null;
  url: string | null;
  type: string | null;
}

export interface review_review {
  __typename: "Review";
  id: number | null;
  user: review_review_user | null;
  rating: string | null;
  feedback: string | null;
  isActive: boolean | null;
  helpful: number | null;
  modalReview: review_review_modalReview | null;
  reviewMedia: (review_review_reviewMedia | null)[] | null;
  createdAt: string;
  updatedAt: string;
}

export interface review {
  review: review_review | null;
}

export interface reviewVariables {
  id: number;
}
