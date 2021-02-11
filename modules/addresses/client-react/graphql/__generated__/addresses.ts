/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: addresses
// ====================================================

export interface addresses_addresses {
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

export interface addresses {
  addresses: (addresses_addresses | null)[];
}

export interface addressesVariables {
  id?: number | null;
}
