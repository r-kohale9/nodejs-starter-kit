/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AddMessageInput } from "./../../../../../packages/server/__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: addMessage
// ====================================================

export interface addMessage_addMessage_quotedMessage {
  __typename: "QuotedMessage";
  id: number | null;
  text: string | null;
  username: string | null;
  path: string | null;
  filename: string | null;
}

export interface addMessage_addMessage {
  __typename: "Message";
  id: number;
  text: string | null;
  userId: number | null;
  username: string | null;
  createdAt: string | null;
  uuid: string | null;
  quotedId: number | null;
  filename: string | null;
  path: string | null;
  quotedMessage: addMessage_addMessage_quotedMessage | null;
}

export interface addMessage {
  addMessage: addMessage_addMessage | null;
}

export interface addMessageVariables {
  input: AddMessageInput;
}
