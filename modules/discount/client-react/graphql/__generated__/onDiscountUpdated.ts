/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: onDiscountUpdated
// ====================================================

export interface onDiscountUpdated_discountUpdated_node_discountDuration {
  __typename: "DiscountDuration";
  id: number | null;
  startDate: string | null;
  endDate: string | null;
  isActive: boolean | null;
}

export interface onDiscountUpdated_discountUpdated_node {
  __typename: "Discount";
  id: number | null;
  modalId: number | null;
  modalName: string | null;
  discountPercent: number | null;
  discountDuration: onDiscountUpdated_discountUpdated_node_discountDuration | null;
  isActive: boolean | null;
}

export interface onDiscountUpdated_discountUpdated {
  __typename: "UpdateDiscountPayload";
  mutation: string;
  modalId: number | null;
  node: onDiscountUpdated_discountUpdated_node | null;
}

export interface onDiscountUpdated {
  discountUpdated: onDiscountUpdated_discountUpdated | null;
}

export interface onDiscountUpdatedVariables {
  modalId?: number | null;
}
