/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AddMobileInput } from "./../../../../../packages/server/__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: addUserMobile
// ====================================================

export interface addUserMobile_addUserMobile {
  __typename: "UserMobile";
  mobile: string;
  otpSent: boolean | null;
  isVerified: boolean | null;
  error: string | null;
}

export interface addUserMobile {
  addUserMobile: addUserMobile_addUserMobile;
}

export interface addUserMobileVariables {
  input: AddMobileInput;
}
