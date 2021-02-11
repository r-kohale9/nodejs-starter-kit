/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: onCategoryUpdated
// ====================================================

export interface onCategoryUpdated_categoryUpdated_node_modalCategory {
  __typename: "ModalCategory";
  id: number | null;
  modalName: string | null;
}

export interface onCategoryUpdated_categoryUpdated_node_subCategories_modalCategory {
  __typename: "ModalCategory";
  id: number | null;
  modalName: string | null;
}

export interface onCategoryUpdated_categoryUpdated_node_subCategories {
  __typename: "Category";
  id: number | null;
  title: string | null;
  imageUrl: string | null;
  description: string | null;
  parentCategoryId: number | null;
  modalCategory: onCategoryUpdated_categoryUpdated_node_subCategories_modalCategory | null;
  isNavbar: boolean | null;
  isLeaf: boolean | null;
  isActive: boolean | null;
}

export interface onCategoryUpdated_categoryUpdated_node {
  __typename: "Category";
  id: number | null;
  title: string | null;
  imageUrl: string | null;
  description: string | null;
  parentCategoryId: number | null;
  modalCategory: onCategoryUpdated_categoryUpdated_node_modalCategory | null;
  isNavbar: boolean | null;
  isLeaf: boolean | null;
  isActive: boolean | null;
  subCategories: (onCategoryUpdated_categoryUpdated_node_subCategories | null)[] | null;
}

export interface onCategoryUpdated_categoryUpdated {
  __typename: "UpdateCategoryPayload";
  mutation: string;
  id: number | null;
  node: onCategoryUpdated_categoryUpdated_node | null;
}

export interface onCategoryUpdated {
  categoryUpdated: onCategoryUpdated_categoryUpdated | null;
}

export interface onCategoryUpdatedVariables {
  id?: number | null;
}
