/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ReviewInfo
// ====================================================

export interface ReviewInfo_user_profile {
  __typename: "UserProfile";
  firstName: string | null;
  lastName: string | null;
  fullName: string | null;
  avatar: string | null;
}

export interface ReviewInfo_user_auth_certificate {
  __typename: "CertificateAuth";
  serial: string | null;
}

export interface ReviewInfo_user_auth_facebook {
  __typename: "FacebookAuth";
  fbId: string | null;
  displayName: string | null;
}

export interface ReviewInfo_user_auth_google {
  __typename: "GoogleAuth";
  googleId: string | null;
  displayName: string | null;
}

export interface ReviewInfo_user_auth_github {
  __typename: "GithubAuth";
  ghId: string | null;
  displayName: string | null;
}

export interface ReviewInfo_user_auth_linkedin {
  __typename: "LinkedInAuth";
  lnId: string | null;
  displayName: string | null;
}

export interface ReviewInfo_user_auth {
  __typename: "UserAuth";
  certificate: ReviewInfo_user_auth_certificate | null;
  facebook: ReviewInfo_user_auth_facebook | null;
  google: ReviewInfo_user_auth_google | null;
  github: ReviewInfo_user_auth_github | null;
  linkedin: ReviewInfo_user_auth_linkedin | null;
}

export interface ReviewInfo_user {
  __typename: "User";
  id: number;
  username: string;
  role: string;
  isActive: boolean | null;
  email: string;
  profile: ReviewInfo_user_profile | null;
  auth: ReviewInfo_user_auth | null;
}

export interface ReviewInfo_modalReview {
  __typename: "ModalReview";
  modalName: string | null;
  modalId: number | null;
}

export interface ReviewInfo_reviewMedia {
  __typename: "ReviewMedium";
  id: number | null;
  url: string | null;
  type: string | null;
}

export interface ReviewInfo {
  __typename: "Review";
  id: number | null;
  user: ReviewInfo_user | null;
  rating: string | null;
  feedback: string | null;
  isActive: boolean | null;
  helpful: number | null;
  modalReview: ReviewInfo_modalReview | null;
  reviewMedia: (ReviewInfo_reviewMedia | null)[] | null;
  createdAt: string;
  updatedAt: string;
}
