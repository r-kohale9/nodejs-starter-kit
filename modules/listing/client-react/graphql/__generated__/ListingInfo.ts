/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ListingInfo
// ====================================================

export interface ListingInfo_user_profile {
  __typename: "UserProfile";
  firstName: string | null;
  lastName: string | null;
  fullName: string | null;
  avatar: string | null;
}

export interface ListingInfo_user_auth_certificate {
  __typename: "CertificateAuth";
  serial: string | null;
}

export interface ListingInfo_user_auth_facebook {
  __typename: "FacebookAuth";
  fbId: string | null;
  displayName: string | null;
}

export interface ListingInfo_user_auth_google {
  __typename: "GoogleAuth";
  googleId: string | null;
  displayName: string | null;
}

export interface ListingInfo_user_auth_github {
  __typename: "GithubAuth";
  ghId: string | null;
  displayName: string | null;
}

export interface ListingInfo_user_auth_linkedin {
  __typename: "LinkedInAuth";
  lnId: string | null;
  displayName: string | null;
}

export interface ListingInfo_user_auth {
  __typename: "UserAuth";
  certificate: ListingInfo_user_auth_certificate | null;
  facebook: ListingInfo_user_auth_facebook | null;
  google: ListingInfo_user_auth_google | null;
  github: ListingInfo_user_auth_github | null;
  linkedin: ListingInfo_user_auth_linkedin | null;
}

export interface ListingInfo_user {
  __typename: "User";
  id: number;
  username: string;
  role: string;
  isActive: boolean | null;
  email: string;
  profile: ListingInfo_user_profile | null;
  auth: ListingInfo_user_auth | null;
}

export interface ListingInfo_category_modalCategory {
  __typename: "ModalCategory";
  id: number | null;
  modalName: string | null;
}

export interface ListingInfo_category_subCategories_modalCategory {
  __typename: "ModalCategory";
  id: number | null;
  modalName: string | null;
}

export interface ListingInfo_category_subCategories {
  __typename: "Category";
  id: number | null;
  title: string | null;
  imageUrl: string | null;
  description: string | null;
  parentCategoryId: number | null;
  modalCategory: ListingInfo_category_subCategories_modalCategory | null;
  isNavbar: boolean | null;
  isLeaf: boolean | null;
  isActive: boolean | null;
}

export interface ListingInfo_category {
  __typename: "Category";
  id: number | null;
  title: string | null;
  imageUrl: string | null;
  description: string | null;
  parentCategoryId: number | null;
  modalCategory: ListingInfo_category_modalCategory | null;
  isNavbar: boolean | null;
  isLeaf: boolean | null;
  isActive: boolean | null;
  subCategories: (ListingInfo_category_subCategories | null)[] | null;
}

export interface ListingInfo_listingFlags {
  __typename: "ListingFlag";
  id: number | null;
  isFeatured: boolean | null;
  isNew: boolean | null;
  isDiscount: boolean | null;
}

export interface ListingInfo_listingHighlight {
  __typename: "ListingHighlight";
  id: number | null;
  highlight: string | null;
}

export interface ListingInfo_listingOptions {
  __typename: "ListingOption";
  id: number | null;
  fixedQuantity: number | null;
}

export interface ListingInfo_listingDetail {
  __typename: "ListingDetail";
  id: number | null;
  inventoryCount: number | null;
}

export interface ListingInfo_listingMedia {
  __typename: "ListingMedium";
  id: number | null;
  url: string | null;
  type: string | null;
  isActive: boolean | null;
}

export interface ListingInfo_listingCostArray {
  __typename: "ListingCost";
  id: number | null;
  cost: number | null;
  discount: number | null;
  type: string | null;
  label: string | null;
}

export interface ListingInfo {
  __typename: "Listing";
  id: number | null;
  user: ListingInfo_user | null;
  title: string;
  description: string | null;
  sku: string | null;
  brand: string | null;
  category: ListingInfo_category | null;
  listingFlags: ListingInfo_listingFlags | null;
  listingHighlight: (ListingInfo_listingHighlight | null)[] | null;
  listingOptions: ListingInfo_listingOptions | null;
  listingDetail: ListingInfo_listingDetail | null;
  listingMedia: (ListingInfo_listingMedia | null)[] | null;
  listingCostArray: (ListingInfo_listingCostArray | null)[] | null;
  isActive: boolean | null;
  createdAt: string;
  updatedAt: string;
}
