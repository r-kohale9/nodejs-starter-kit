/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { FilterDiscountInput } from "./../../../../../packages/server/__generated__/globalTypes";

// ====================================================
// GraphQL subscription operation: onDiscountsUpdated
// ====================================================

export interface onDiscountsUpdated_discountsUpdated_node_discountDuration {
  __typename: "DiscountDuration";
  id: number | null;
  startDate: string | null;
  endDate: string | null;
  isActive: boolean | null;
}

export interface onDiscountsUpdated_discountsUpdated_node {
  __typename: "Discount";
  id: number | null;
  modalId: number | null;
  modalName: string | null;
  discountPercent: number | null;
  discountDuration: onDiscountsUpdated_discountsUpdated_node_discountDuration | null;
  isActive: boolean | null;
}

export interface onDiscountsUpdated_discountsUpdated {
  __typename: "UpdateDiscountPayload";
  mutation: string;
  node: onDiscountsUpdated_discountsUpdated_node | null;
}

export interface onDiscountsUpdated {
  discountsUpdated: onDiscountsUpdated_discountsUpdated | null;
}

export interface onDiscountsUpdatedVariables {
  endCursor?: number | null;
  filter?: FilterDiscountInput | null;
}
