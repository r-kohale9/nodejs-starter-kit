/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: onDynamicCarouselUpdated
// ====================================================

export interface onDynamicCarouselUpdated_dynamicCarouselUpdated_node {
  __typename: "DynamicCarousel";
  id: number | null;
  title: string | null;
  description: string | null;
  label: string | null;
  link: string | null;
  imageUrl: string;
  isActive: boolean | null;
}

export interface onDynamicCarouselUpdated_dynamicCarouselUpdated {
  __typename: "UpdateDynamicCarouselPayload";
  mutation: string;
  node: onDynamicCarouselUpdated_dynamicCarouselUpdated_node | null;
}

export interface onDynamicCarouselUpdated {
  dynamicCarouselUpdated: onDynamicCarouselUpdated_dynamicCarouselUpdated | null;
}
