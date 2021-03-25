/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: orderStates
// ====================================================

export interface orderStates_orderStates {
  __typename: "OrderStates";
  id: number | null;
  state: string | null;
  isActive: boolean | null;
}

export interface orderStates {
  orderStates: (orderStates_orderStates | null)[] | null;
}
