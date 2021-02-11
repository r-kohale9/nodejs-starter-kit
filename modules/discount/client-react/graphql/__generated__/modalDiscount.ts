/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: modalDiscount
// ====================================================

export interface modalDiscount_modalDiscount_discountDuration {
  __typename: "DiscountDuration";
  id: number | null;
  startDate: string | null;
  endDate: string | null;
  isActive: boolean | null;
}

export interface modalDiscount_modalDiscount {
  __typename: "Discount";
  id: number | null;
  modalId: number | null;
  modalName: string | null;
  discountPercent: number | null;
  discountDuration: modalDiscount_modalDiscount_discountDuration | null;
  isActive: boolean | null;
}

export interface modalDiscount {
  modalDiscount: modalDiscount_modalDiscount | null;
}

export interface modalDiscountVariables {
  modalId?: number | null;
  modalName?: string | null;
}
