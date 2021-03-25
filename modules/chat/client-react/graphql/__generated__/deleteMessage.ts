/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: deleteMessage
// ====================================================

export interface deleteMessage_deleteMessage {
  __typename: "Message";
  id: number;
}

export interface deleteMessage {
  deleteMessage: deleteMessage_deleteMessage | null;
}

export interface deleteMessageVariables {
  id: number;
}
