/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EditMessageInput } from "./../../../../../packages/server/__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: editMessage
// ====================================================

export interface editMessage_editMessage_quotedMessage {
  __typename: "QuotedMessage";
  id: number | null;
  text: string | null;
  username: string | null;
  path: string | null;
  filename: string | null;
}

export interface editMessage_editMessage {
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
  quotedMessage: editMessage_editMessage_quotedMessage | null;
}

export interface editMessage {
  editMessage: editMessage_editMessage | null;
}

export interface editMessageVariables {
  input: EditMessageInput;
}
