/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: platform
// ====================================================

export interface platform_platform_platformInfo {
  __typename: "PlatformInfo";
  id: number | null;
  mobile: string | null;
  email: string | null;
  address: string | null;
  isActive: boolean | null;
}

export interface platform_platform_platformSocial {
  __typename: "PlatformSocial";
  id: number | null;
  youtube: string | null;
  facebook: string | null;
  instagram: string | null;
  linkedIn: string | null;
  twitter: string | null;
}

export interface platform_platform {
  __typename: "Platform";
  id: number | null;
  name: string | null;
  logo: string | null;
  type: string | null;
  platformInfo: platform_platform_platformInfo | null;
  platformSocial: platform_platform_platformSocial | null;
  isActive: boolean | null;
}

export interface platform {
  platform: platform_platform | null;
}

export interface platformVariables {
  id: number;
}
