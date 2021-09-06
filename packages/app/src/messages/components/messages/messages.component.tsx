/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useEffect, useState } from "react"
import { defineMessages } from "react-intl"
import { TableWithSidebarWrapper } from "Renderer/components/core/table/table.component"
import ThreadList from "App/messages/components/thread-list.component"
import { ComponentProps as MessagesComponentProps } from "App/messages/components/messages/messages.interface"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { noop } from "Renderer/utils/noop"
import ThreadDetails from "App/messages/components/thread-details.component"
import MessagesPanel from "App/messages/components/messages-panel.component"
import useTableSelect from "Renderer/utils/hooks/useTableSelect"
import useURLSearchParams from "Renderer/utils/hooks/use-url-search-params"
import findThreadBySearchParams from "App/messages/components/find-thread-by-search-params"
import { intl, textFormatters } from "Renderer/utils/intl"
import modalService from "Renderer/components/core/modal/modal.service"
import DeleteModal from "Renderer/components/core/modal/delete-modal.component"
import { Message as TranslationMessage } from "Renderer/interfaces/message.interface"
import getPrettyCaller from "Renderer/models/calls/get-pretty-caller"
import { AppSettings } from "App/main/store/settings.interface"
import { useHistory } from "react-router-dom"
import createRouterPath from "Renderer/utils/create-router-path"
import { URL_MAIN } from "Renderer/constants/urls"
import AttachContactModal from "App/messages/components/attach-contact-modal.component"
import { Contact } from "App/contacts/store/contacts.type"
import { ContactCategory } from "App/contacts/store/contacts.interface"
import {
  Message,
  NewMessage,
  Receiver,
  ReceiverIdentification,
  ResultState,
  Thread,
} from "App/messages/store/messages.interface"
import NewMessageForm from "App/messages/components/new-message-form.component"
import { MessagesTestIds } from "App/messages/components/messages/messages-test-ids.enum"
import { mapToRawNumber } from "App/messages/helpers/map-to-raw-number"

const deleteModalMessages = defineMessages({
  title: { id: "module.messages.deleteModalTitle" },
  body: {
    id: "module.messages.deleteModalBody",
  },
})

const mockThread: Thread = {
  id: "tmpId",
  contactId: "tmpId",
  phoneNumber: "New Conversation",
  lastUpdatedAt: new Date(),
  messageSnippet: "",
  unread: false,
}

enum MessagesState {
  List,
  ThreadDetails,
  NewMessage,
}

interface Props extends MessagesComponentProps, Pick<AppSettings, "language"> {
  receivers: Receiver[]
  attachContactList: ContactCategory[]
  attachContactFlatList: Contact[]
  getMessagesByThreadId: (threadId: string) => Message[]
  getContact: (contactId: string) => Contact | undefined
  getReceiver: (contactId: string) => Receiver
  getContactByPhoneNumber: (phoneNumber: string) => Contact | undefined
  loadMessagesByThreadId: (threadId: string) => Message[]
  getMessagesResultMapStateByThreadId: (threadId: string) => ResultState
  isContactCreated: (id: string) => boolean
  addNewMessage: (newMessage: NewMessage) => Promise<Message | undefined>
}

const Messages: FunctionComponent<Props> = ({
  receivers,
  searchValue,
  changeSearchValue = noop,
  deleteThreads = noop,
  threads,
  getMessagesByThreadId,
  getContact,
  getReceiver,
  toggleReadStatus = noop,
  language,
  attachContactList,
  attachContactFlatList,
  loadMessagesByThreadId,
  getMessagesResultMapStateByThreadId,
  getContactByPhoneNumber,
  isContactCreated,
  addNewMessage,
}) => {
  const [messagesState, setMessagesState] = useState(MessagesState.List)
  const [activeThread, setActiveThread] = useState<Thread | undefined>(
    findThreadBySearchParams(useURLSearchParams(), threads)
  )
  const [tmpActiveThread, setTmpActiveThread] = useState<Thread | undefined>()

  const [content, setContent] = useState("")

  useEffect(() => {
    if (activeThread !== undefined) {
      loadMessagesByThreadId(activeThread.id)
    }
  }, [activeThread])

  const { selectedRows, allRowsSelected, toggleAll, resetRows, ...rest } =
    useTableSelect<Thread>(threads)

  const getDeletingMessage = (ids: string[]): TranslationMessage => {
    const findById = (thread: Thread) => thread.id === ids[0]
    const thread = threads.find(findById) as Thread

    return {
      ...deleteModalMessages.body,
      values: {
        caller: getPrettyCaller(getContact(thread.contactId), thread.id),
        num: allRowsSelected ? -1 : ids.length,
        ...textFormatters,
      },
    }
  }

  const remove = (ids: string[]) => {
    const title = intl.formatMessage(deleteModalMessages.title)
    const message = getDeletingMessage(ids)
    const onDelete = () => {
      deleteThreads(ids)
      resetRows()
      setActiveThread(undefined)
      modalService.closeModal()
    }

    modalService.openModal(
      <DeleteModal
        title={title}
        message={message}
        onClose={resetRows}
        onDelete={onDelete}
      />
    )
  }

  const removeSingleConversation = (id: string) => remove([id])

  const history = useHistory()

  const contactClick = (phoneNumber: string) => {
    history.push(
      createRouterPath(URL_MAIN.contacts, {
        phoneNumber,
      })
    )
  }

  const openAttachContactModal = () => {
    modalService.openModal(
      <AttachContactModal
        contactFlatList={attachContactFlatList}
        contactList={attachContactList}
      />,
      true
    )
  }

  const handleNewMessageClick = () => {
    if (tmpActiveThread === undefined || tmpActiveThread.phoneNumber !== mockThread.phoneNumber) {
      // open new Message
      setContent("")
      setActiveThread(mockThread)
      setTmpActiveThread(mockThread)
      setMessagesState(MessagesState.NewMessage)
    }
  }

  const handleNewMessageFormClose = () => {
    // open List
    setContent("")
    setActiveThread(undefined)
    setTmpActiveThread(undefined)
    setMessagesState(MessagesState.List)
  }

  const handleThreadDetailsClose = () => {
    // open List
    setContent("")
    setActiveThread(undefined)
    setTmpActiveThread(undefined)
    setMessagesState(MessagesState.List)
  }

  const handleThreadClick = (thread: Thread) => {
    if (activeThread?.id !== thread.id) {
      // open ThreadDetails
      setContent("")
      setActiveThread(thread)
      setTmpActiveThread(undefined)
      setMessagesState(MessagesState.ThreadDetails)
    }
  }

  const handleLoadMessagesClick = () => {
    if (activeThread) {
      loadMessagesByThreadId(activeThread.id)
    }
  }

  const handleDeleteClick = () => {
    if (tmpActiveThread !== undefined) {
      // open List
      setContent("")
      setTmpActiveThread(undefined)
      setActiveThread(undefined)
      setMessagesState(MessagesState.List)
      return
    }

    if (activeThread) {
      remove([activeThread.id])
    }
  }
  const handleContactClick = () => {
    if (activeThread) {
      history.push(
        createRouterPath(URL_MAIN.contacts, {
          phoneNumber: activeThread.phoneNumber,
        })
      )
    }
  }

  const markAsUnread = () => {
    if (activeThread) {
      toggleReadStatus([activeThread.id])
      handleThreadDetailsClose()
    }
  }

  const handleContentChange = (content: string) => {
    setContent((previousValue) => {
      return content.length >= 115 ? previousValue : content
    })
  }

  const handleAddNewMessage = async (phoneNumber: string) => {
    const message = await addNewMessage({ content, phoneNumber })
    if (message) {
      const thread = threads.find(({ id }) => id === message.threadId)
      if (thread) {
        // open ThreadDetails
        setContent("")
        setActiveThread(thread)
        setTmpActiveThread(undefined)
        setMessagesState(MessagesState.ThreadDetails)
      }
    }
  }

  const handleNewMessageSendClick = async (number: string) => {
    await handleAddNewMessage(number)
  }

  const handleSendClick = async () => {
    if (activeThread) {
      const phoneNumber = activeThread.phoneNumber
      await handleAddNewMessage(phoneNumber)
    }
  }

  const handleReceiverSelect = ({
    contactId,
    phoneNumber,
  }: Pick<Receiver, "contactId" | "phoneNumber">) => {
    const thread = threads.find(
      (thread) =>
        mapToRawNumber(thread.phoneNumber) === mapToRawNumber(phoneNumber)
    )

    if (thread) {
      // open ThreadDetails
      setActiveThread(thread)
      setTmpActiveThread(undefined)
      setMessagesState(MessagesState.ThreadDetails)
    } else {
      // open ThreadDetails as new thread
      const tmpThread = { ...mockThread, phoneNumber, contactId: contactId }
      setTmpActiveThread(tmpThread)
      setActiveThread(tmpThread)
      setMessagesState(MessagesState.ThreadDetails)
    }
  }

  const handlePhoneNumberSelect = (phoneNumber: string) => {
    const contact = getContactByPhoneNumber(phoneNumber)
    const contactId = contact ? contact.id : mockThread.contactId
    handleReceiverSelect({
      phoneNumber,
      contactId,
    })
  }

  const getViewReceiver = (activeThread: Thread): Receiver => {
    if (activeThread.contactId === mockThread.contactId) {
      return {
        contactId: mockThread.contactId,
        phoneNumber: activeThread.phoneNumber,
        identification: ReceiverIdentification.unknown
      }
    } else {
      return getReceiver(activeThread.contactId)
    }
  }

  const getThreads = (): Thread[] => {
    if (tmpActiveThread !== undefined) {
      return [tmpActiveThread, ...threads]
    } else {
      return threads
    }
  }

  return (
    <>
      <MessagesPanel
        searchValue={searchValue}
        onSearchValueChange={changeSearchValue}
        onNewMessageClick={handleNewMessageClick}
      />
      <TableWithSidebarWrapper>
        <ThreadList
          threads={getThreads()}
          onThreadClick={handleThreadClick}
          activeThread={activeThread}
          getContact={getContact}
          onDeleteClick={removeSingleConversation}
          onToggleReadStatus={toggleReadStatus}
          onContactClick={contactClick}
          isContactCreated={isContactCreated}
          language={language}
          {...rest}
        />
        {messagesState === MessagesState.ThreadDetails && activeThread && (
          <ThreadDetails
            data-testid={MessagesTestIds.ThreadDetails}
            content={content}
            receiver={getViewReceiver(activeThread)}
            messages={getMessagesByThreadId(activeThread.id)}
            resultState={getMessagesResultMapStateByThreadId(activeThread.id)}
            contactCreated={isContactCreated(activeThread.contactId)}
            onLoadMessagesClick={handleLoadMessagesClick}
            onAttachContactClick={openAttachContactModal}
            onContactClick={handleContactClick}
            onDeleteClick={handleDeleteClick}
            onCheckClick={markAsUnread}
            onClose={handleThreadDetailsClose}
            onSendClick={handleSendClick}
            onContentChange={handleContentChange}
          />
        )}
        {messagesState === MessagesState.NewMessage && (
          <NewMessageForm
            data-testid={MessagesTestIds.NewMessageForm}
            content={content}
            receivers={receivers}
            onContentChange={handleContentChange}
            onSendClick={handleNewMessageSendClick}
            onPhoneNumberSelect={handlePhoneNumberSelect}
            onReceiverSelect={handleReceiverSelect}
            onClose={handleNewMessageFormClose}
            onAttachContactClick={openAttachContactModal}
          />
        )}
      </TableWithSidebarWrapper>
    </>
  )
}

export default Messages
