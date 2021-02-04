/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: category
// ====================================================

export interface category_category_modalCategory {
  __typename: "ModalCategory";
  id: number | null;
  modalName: string | null;
}

export interface category_category_subCategories_modalCategory {
  __typename: "ModalCategory";
  id: number | null;
  modalName: string | null;
}

export interface category_category_subCategories {
  __typename: "Category";
  id: number | null;
  title: string | null;
  imageUrl: string | null;
  description: string | null;
  parentCategoryId: number | null;
  modalCategory: category_category_subCategories_modalCategory | null;
  isNavbar: boolean | null;
  isLeaf: boolean | null;
  isActive: boolean | null;
}

export interface category_category {
  __typename: "Category";
  id: number | null;
  title: string | null;
  imageUrl: string | null;
  description: string | null;
  parentCategoryId: number | null;
  modalCategory: category_category_modalCategory | null;
  isNavbar: boolean | null;
  isLeaf: boolean | null;
  isActive: boolean | null;
  subCategories: (category_category_subCategories | null)[] | null;
}

export interface category {
  category: category_category | null;
}

export interface categoryVariables {
  id: number;
}
