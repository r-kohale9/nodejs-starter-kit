/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: onAddressUpdated
// ====================================================

export interface onAddressUpdated_addressesUpdated_node {
  __typename: "Address";
  id: number | null;
  userId: number;
  streetAddress1: string | null;
  streetAddress2: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  pinCode: number | null;
  firstName: string | null;
  lastName: string | null;
  mobile: string | null;
  isDefault: boolean | null;
}

export interface onAddressUpdated_addressesUpdated {
  __typename: "UpdateAddressPayload";
  mutation: string;
  id: number | null;
  node: onAddressUpdated_addressesUpdated_node | null;
}

export interface onAddressUpdated {
  addressesUpdated: onAddressUpdated_addressesUpdated | null;
}

export interface onAddressUpdatedVariables {
  userId?: number | null;
}
