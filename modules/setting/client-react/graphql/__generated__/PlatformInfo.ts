/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: PlatformInfo
// ====================================================

export interface PlatformInfo_platformInfo {
  __typename: "PlatformInfo";
  id: number | null;
  mobile: string | null;
  email: string | null;
  address: string | null;
  isActive: boolean | null;
}

export interface PlatformInfo_platformSocial {
  __typename: "PlatformSocial";
  id: number | null;
  youtube: string | null;
  facebook: string | null;
  instagram: string | null;
  linkedIn: string | null;
  twitter: string | null;
}

export interface PlatformInfo {
  __typename: "Platform";
  id: number | null;
  name: string | null;
  logo: string | null;
  type: string | null;
  platformInfo: PlatformInfo_platformInfo | null;
  platformSocial: PlatformInfo_platformSocial | null;
  isActive: boolean | null;
}
