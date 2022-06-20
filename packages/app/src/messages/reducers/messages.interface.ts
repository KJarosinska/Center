/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Caller } from "App/__deprecated__/renderer/models/calls/calls.interface"
import { Contact } from "App/contacts/reducers/contacts.interface"
import { PayloadAction } from "@reduxjs/toolkit"
import { MessagesEvent, ThreadDeletingState } from "App/messages/constants"

export enum VisibilityFilter {
  All = "all",
  Unread = "unread",
}

export type Author = Pick<Caller, "id">

export enum ResultState {
  Loading,
  Loaded,
  Empty,
  Error,
}

export enum MessageType {
  INBOX = "INBOX",
  OUTBOX = "OUTBOX",
  FAILED = "FAILED",
}

export interface Message {
  id: string
  date: Date
  content: string
  phoneNumber: string
  threadId: string
  messageType: MessageType
}

export interface NewMessage {
  phoneNumber: Message["phoneNumber"]
  content: Message["content"]
  threadId?: Message["threadId"]
}

export type MessageMap = { [id: string]: Message }

export interface Thread {
  id: string
  phoneNumber: string
  lastUpdatedAt: Date
  messageSnippet: string
  unread: boolean
  messageType: MessageType
}

export type ThreadMap = { [id: string]: Thread }

export type MessageIdsInThreadMap = { [id: string]: Message["id"][] }

export type MessagesState = Readonly<{
  threadMap: ThreadMap
  messageMap: MessageMap
  messageIdsInThreadMap: MessageIdsInThreadMap
  searchValue: string
  visibilityFilter: VisibilityFilter
  threadsState: ResultState
  messagesStateMap: { [id: string]: ResultState }
  error: Error | string | null
  deletingState: ThreadDeletingState | null
}>

export enum ReceiverIdentification {
  unknown,
  primary,
  secondary,
}

export interface Receiver extends Pick<Contact, "firstName" | "lastName"> {
  phoneNumber: string
  identification: ReceiverIdentification
}

export type AddNewMessageAction = PayloadAction<
  {
    messageParts: {
      message: Message
      thread?: Thread
    }[]
  },
  MessagesEvent.AddNewMessage
>

export type ToggleThreadsReadStatusPendingAction = PayloadAction<
  undefined,
  MessagesEvent.ToggleThreadsReadStatus,
  {
    arg: Thread[]
  }
>
export type MarkThreadsReadStatusPendingAction = PayloadAction<
  undefined,
  MessagesEvent.ToggleThreadsReadStatus,
  {
    arg: Thread[]
  }
>
export type MarkThreadsReadStatusAction = PayloadAction<
  Thread[],
  MessagesEvent.ToggleThreadsReadStatus,
  {
    arg: Thread[]
  }
>

export type DeleteThreadsAction = PayloadAction<
  string[],
  MessagesEvent.DeleteThreads
>

export type ChangeVisibilityFilterAction = PayloadAction<
  MessagesState["visibilityFilter"],
  MessagesEvent.ChangeVisibilityFilter
>

export type ChangeSearchValueAction = PayloadAction<
  string,
  MessagesEvent.ChangeSearchValue
>
