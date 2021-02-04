/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: MessageInfo
// ====================================================

export interface MessageInfo_quotedMessage {
  __typename: "QuotedMessage";
  id: number | null;
  text: string | null;
  username: string | null;
  path: string | null;
  filename: string | null;
}

export interface MessageInfo {
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
  quotedMessage: MessageInfo_quotedMessage | null;
}
