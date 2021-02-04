/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: onListingReviewUpdated
// ====================================================

export interface onListingReviewUpdated_listingReview {
  __typename: "UpdateListingReviewPayload";
  mutation: string;
  id: number | null;
  node: boolean | null;
}

export interface onListingReviewUpdated {
  listingReview: onListingReviewUpdated_listingReview | null;
}

export interface onListingReviewUpdatedVariables {
  id?: number | null;
}
