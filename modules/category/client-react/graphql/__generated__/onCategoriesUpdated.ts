/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { FilterCategoryInput } from "./../../../../../packages/server/__generated__/globalTypes";

// ====================================================
// GraphQL subscription operation: onCategoriesUpdated
// ====================================================

export interface onCategoriesUpdated_categoriesUpdated_node_modalCategory {
  __typename: "ModalCategory";
  id: number | null;
  modalName: string | null;
}

export interface onCategoriesUpdated_categoriesUpdated_node_subCategories_modalCategory {
  __typename: "ModalCategory";
  id: number | null;
  modalName: string | null;
}

export interface onCategoriesUpdated_categoriesUpdated_node_subCategories {
  __typename: "Category";
  id: number | null;
  title: string | null;
  imageUrl: string | null;
  description: string | null;
  parentCategoryId: number | null;
  modalCategory: onCategoriesUpdated_categoriesUpdated_node_subCategories_modalCategory | null;
  isNavbar: boolean | null;
  isLeaf: boolean | null;
  isActive: boolean | null;
}

export interface onCategoriesUpdated_categoriesUpdated_node {
  __typename: "Category";
  id: number | null;
  title: string | null;
  imageUrl: string | null;
  description: string | null;
  parentCategoryId: number | null;
  modalCategory: onCategoriesUpdated_categoriesUpdated_node_modalCategory | null;
  isNavbar: boolean | null;
  isLeaf: boolean | null;
  isActive: boolean | null;
  subCategories: (onCategoriesUpdated_categoriesUpdated_node_subCategories | null)[] | null;
}

export interface onCategoriesUpdated_categoriesUpdated {
  __typename: "UpdateCategoryPayload";
  mutation: string;
  node: onCategoriesUpdated_categoriesUpdated_node | null;
}

export interface onCategoriesUpdated {
  categoriesUpdated: onCategoriesUpdated_categoriesUpdated | null;
}

export interface onCategoriesUpdatedVariables {
  endCursor?: number | null;
  filter?: FilterCategoryInput | null;
}
