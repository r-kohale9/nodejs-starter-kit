/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ratingAverage
// ====================================================

export interface ratingAverage_ratingAverage {
  __typename: "Rating";
  id: number | null;
  modalName: string | null;
  modalId: number | null;
  one: number | null;
  two: number | null;
  three: number | null;
  four: number | null;
  five: number | null;
}

export interface ratingAverage {
  ratingAverage: ratingAverage_ratingAverage | null;
}

export interface ratingAverageVariables {
  modalName: string;
  modalId: number;
}
