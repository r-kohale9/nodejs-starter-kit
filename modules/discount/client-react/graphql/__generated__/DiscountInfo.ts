/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: DiscountInfo
// ====================================================

export interface DiscountInfo_discountDuration {
  __typename: "DiscountDuration";
  id: number | null;
  startDate: string | null;
  endDate: string | null;
  isActive: boolean | null;
}

export interface DiscountInfo {
  __typename: "Discount";
  id: number | null;
  modalId: number | null;
  modalName: string | null;
  discountPercent: number | null;
  discountDuration: DiscountInfo_discountDuration | null;
  isActive: boolean | null;
}
