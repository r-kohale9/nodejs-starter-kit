/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: listing
// ====================================================

export interface listing_listing_user_profile {
  __typename: "UserProfile";
  firstName: string | null;
  lastName: string | null;
  fullName: string | null;
  avatar: string | null;
}

export interface listing_listing_user_auth_certificate {
  __typename: "CertificateAuth";
  serial: string | null;
}

export interface listing_listing_user_auth_facebook {
  __typename: "FacebookAuth";
  fbId: string | null;
  displayName: string | null;
}

export interface listing_listing_user_auth_google {
  __typename: "GoogleAuth";
  googleId: string | null;
  displayName: string | null;
}

export interface listing_listing_user_auth_github {
  __typename: "GithubAuth";
  ghId: string | null;
  displayName: string | null;
}

export interface listing_listing_user_auth_linkedin {
  __typename: "LinkedInAuth";
  lnId: string | null;
  displayName: string | null;
}

export interface listing_listing_user_auth {
  __typename: "UserAuth";
  certificate: listing_listing_user_auth_certificate | null;
  facebook: listing_listing_user_auth_facebook | null;
  google: listing_listing_user_auth_google | null;
  github: listing_listing_user_auth_github | null;
  linkedin: listing_listing_user_auth_linkedin | null;
}

export interface listing_listing_user {
  __typename: "User";
  id: number;
  username: string;
  role: string;
  isActive: boolean | null;
  email: string;
  profile: listing_listing_user_profile | null;
  auth: listing_listing_user_auth | null;
}

export interface listing_listing_category_modalCategory {
  __typename: "ModalCategory";
  id: number | null;
  modalName: string | null;
}

export interface listing_listing_category_subCategories_modalCategory {
  __typename: "ModalCategory";
  id: number | null;
  modalName: string | null;
}

export interface listing_listing_category_subCategories {
  __typename: "Category";
  id: number | null;
  title: string | null;
  imageUrl: string | null;
  description: string | null;
  parentCategoryId: number | null;
  modalCategory: listing_listing_category_subCategories_modalCategory | null;
  isNavbar: boolean | null;
  isLeaf: boolean | null;
  isActive: boolean | null;
}

export interface listing_listing_category {
  __typename: "Category";
  id: number | null;
  title: string | null;
  imageUrl: string | null;
  description: string | null;
  parentCategoryId: number | null;
  modalCategory: listing_listing_category_modalCategory | null;
  isNavbar: boolean | null;
  isLeaf: boolean | null;
  isActive: boolean | null;
  subCategories: (listing_listing_category_subCategories | null)[] | null;
}

export interface listing_listing_listingFlags {
  __typename: "ListingFlag";
  id: number | null;
  isFeatured: boolean | null;
  isNew: boolean | null;
  isDiscount: boolean | null;
}

export interface listing_listing_listingHighlight {
  __typename: "ListingHighlight";
  id: number | null;
  highlight: string | null;
}

export interface listing_listing_listingOptions {
  __typename: "ListingOption";
  id: number | null;
  fixedQuantity: number | null;
}

export interface listing_listing_listingDetail {
  __typename: "ListingDetail";
  id: number | null;
  inventoryCount: number | null;
}

export interface listing_listing_listingMedia {
  __typename: "ListingMedium";
  id: number | null;
  url: string | null;
  type: string | null;
  isActive: boolean | null;
}

export interface listing_listing_listingCostArray {
  __typename: "ListingCost";
  id: number | null;
  cost: number | null;
  discount: number | null;
  type: string | null;
  label: string | null;
}

export interface listing_listing {
  __typename: "Listing";
  id: number | null;
  user: listing_listing_user | null;
  title: string;
  description: string | null;
  sku: string | null;
  brand: string | null;
  category: listing_listing_category | null;
  listingFlags: listing_listing_listingFlags | null;
  listingHighlight: (listing_listing_listingHighlight | null)[] | null;
  listingOptions: listing_listing_listingOptions | null;
  listingDetail: listing_listing_listingDetail | null;
  listingMedia: (listing_listing_listingMedia | null)[] | null;
  listingCostArray: (listing_listing_listingCostArray | null)[] | null;
  isActive: boolean | null;
  createdAt: string;
  updatedAt: string;
}

export interface listing {
  listing: listing_listing | null;
}

export interface listingVariables {
  id: number;
}
