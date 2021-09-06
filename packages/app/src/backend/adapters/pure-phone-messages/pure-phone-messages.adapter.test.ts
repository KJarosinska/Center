/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import MuditaDeviceManager, {
  Message as PureMessage,
  Thread as PureThread,
  MessageType as PureMessageType,
} from "@mudita/pure"
import { ipcMain } from "electron-better-ipc"
import { DeviceResponseStatus } from "Backend/adapters/device-response.interface"
import createPurePhoneMessagesAdapter from "Backend/adapters/pure-phone-messages/pure-phone-messages.adapter"
import DeviceService from "Backend/device-service"
import {
  Message,
  MessageType,
  NewMessage,
  Thread,
} from "App/messages/store/messages.interface"

const mockPureData: PureThread[] = [
  {
    contactID: 1,
    isUnread: true,
    lastUpdatedAt: 1617089558,
    messageCount: 1,
    messageSnippet:
      "Nulla itaque laborum delectus a id aliquam quod. Voluptas molestiae sit excepturi voluptas fuga cupiditate.",
    messageType: 1,
    number: "+48500600700",
    threadID: 1,
  },
  {
    contactID: 1,
    isUnread: true,
    lastUpdatedAt: 1615089558,
    messageCount: 1,
    messageSnippet:
      "Et beatae dicta ut consequatur aut. Consequuntur odio voluptas sed eligendi repudiandae quo amet.",
    messageType: 2,
    number: "+48500600700",
    threadID: 2,
  },
]

const mockPureMessageData: PureMessage[] = [
  {
    contactID: 1,
    messageBody:
      "Nulla itaque laborum delectus a id aliquam quod. Voluptas molestiae sit excepturi voluptas fuga cupiditate.",
    messageID: 1,
    messageType: PureMessageType.INBOX,
    createdAt: 1547465101,
    threadID: 1,
    number: "+48500600700",
  },
  {
    contactID: 1,
    messageBody: "Nulla itaque?",
    messageID: 2,
    messageType: PureMessageType.OUTBOX,
    createdAt: 1547468701,
    threadID: 1,
    number: "+48500600700",
  },
]

const threads: Thread[] = [
  {
    id: "1",
    number: "+48500600700",
    contactId: "1",
    lastUpdatedAt: new Date(1617089558 * 1000),
    messageSnippet:
      "Nulla itaque laborum delectus a id aliquam quod. Voluptas molestiae sit excepturi voluptas fuga cupiditate.",
    unread: true,
  },
  {
    id: "2",
    number: "+48500600700",
    contactId: "1",
    lastUpdatedAt: new Date(1615089558 * 1000),
    messageSnippet:
      "Et beatae dicta ut consequatur aut. Consequuntur odio voluptas sed eligendi repudiandae quo amet.",
    unread: true,
  },
]

const messages: Message[] = [
  {
    id: "1",
    date: new Date(1547465101 * 1000),
    content:
      "Nulla itaque laborum delectus a id aliquam quod. Voluptas molestiae sit excepturi voluptas fuga cupiditate.",
    contactId: "1",
    threadId: "1",
    number: "+48500600700",
    messageType: MessageType.INBOX,
  },
  {
    id: "2",
    date: new Date(1547468701 * 1000),
    content: "Nulla itaque?",
    contactId: "1",
    threadId: "1",
    number: "+48500600700",
    messageType: MessageType.OUTBOX,
  },
]

const mockAddedNewMessageData: NewMessage = {
  content:
    "Nulla itaque laborum delectus a id aliquam quod. Voluptas molestiae sit excepturi voluptas fuga cupiditate.",
  number: "+48500600700",
}

const mockAddedPureMessageData: PureMessage = {
  contactID: 2,
  messageBody: mockAddedNewMessageData.content,
  messageID: 6,
  messageType: PureMessageType.OUTBOX,
  createdAt: 1547465101,
  threadID: 1,
  number: mockAddedNewMessageData.number,
}
const mockAddedMessageData: Message = {
  id: "6",
  date: new Date(mockAddedPureMessageData.createdAt * 1000),
  content: mockAddedNewMessageData.content,
  contactId: "2",
  threadId: "1",
  number: mockAddedNewMessageData.number,
  messageType: MessageType.OUTBOX,
}

jest.mock("Backend/device-service")

test("Threads are returned properly", async () => {
  ;(DeviceService as unknown as jest.Mock).mockImplementation(() => {
    return {
      request: () => {
        return {
          data: { entries: mockPureData, totalCount: mockPureData.length },
          status: DeviceResponseStatus.Ok,
        }
      },
    }
  })
  const purePhoneMessagesAdapter = createPurePhoneMessagesAdapter(
    new DeviceService(MuditaDeviceManager, ipcMain)
  )
  const { data = [], status } = await purePhoneMessagesAdapter.getThreads()
  expect(data).toMatchObject(threads)
  expect(status).toEqual(DeviceResponseStatus.Ok)
})

test("Threads are returned properly even though API is paginated", async () => {
  let requestCount = 0
  ;(DeviceService as unknown as jest.Mock).mockImplementation(() => {
    return {
      request: () => {
        if (requestCount === 1) {
          return {
            data: { entries: [mockPureData[1]], totalCount: 2 },
            status: DeviceResponseStatus.Ok,
          }
        } else {
          requestCount++

          return {
            data: {
              entries: [mockPureData[0]],
              totalCount: 2,
              nextPage: { limit: 1, offset: 1 },
            },
            status: DeviceResponseStatus.Ok,
          }
        }
      },
    }
  })
  const purePhoneMessagesAdapter = createPurePhoneMessagesAdapter(
    new DeviceService(MuditaDeviceManager, ipcMain)
  )
  const response = await purePhoneMessagesAdapter.getThreads()
  const { data, status } = response
  expect(data).toMatchObject(threads)
  expect(status).toEqual(DeviceResponseStatus.Ok)
})

test("Error status is returned when data is undefined ", async () => {
  ;(DeviceService as unknown as jest.Mock).mockImplementation(() => {
    return {
      request: () => {
        return {
          data: undefined,
        }
      },
    }
  })
  const purePhoneMessagesAdapter = createPurePhoneMessagesAdapter(
    new DeviceService(MuditaDeviceManager, ipcMain)
  )
  const response = await purePhoneMessagesAdapter.getThreads()
  const { status } = response
  expect(status).toEqual(DeviceResponseStatus.Error)
})

test("Messages are return properly", async () => {
  ;(DeviceService as unknown as jest.Mock).mockImplementation(() => {
    return {
      request: () => {
        return {
          data: {
            entries: mockPureMessageData,
            totalCount: mockPureMessageData.length,
          },
          status: DeviceResponseStatus.Ok,
        }
      },
    }
  })
  const purePhoneMessagesAdapter = createPurePhoneMessagesAdapter(
    new DeviceService(MuditaDeviceManager, ipcMain)
  )
  const threadId = String(mockPureMessageData[0].threadID)
  const { data = [], status } =
    await purePhoneMessagesAdapter.getMessagesByThreadId(threadId)
  expect(data).toMatchObject(messages)
  expect(status).toEqual(DeviceResponseStatus.Ok)
})

test("Messages are returned properly even the API is paginated", async () => {
  let requestCount = 0
  ;(DeviceService as unknown as jest.Mock).mockImplementation(() => {
    return {
      request: () => {
        if (requestCount === 1) {
          return {
            data: { entries: [mockPureMessageData[1]], totalCount: 2 },
            status: DeviceResponseStatus.Ok,
          }
        } else {
          requestCount++

          return {
            data: {
              entries: [mockPureMessageData[0]],
              totalCount: 2,
              nextPage: { limit: 1, offset: 1 },
            },
            status: DeviceResponseStatus.Ok,
          }
        }
      },
    }
  })
  const purePhoneMessagesAdapter = createPurePhoneMessagesAdapter(
    new DeviceService(MuditaDeviceManager, ipcMain)
  )
  const threadId = String(mockPureMessageData[0].threadID)
  const { data = [], status } =
    await purePhoneMessagesAdapter.getMessagesByThreadId(threadId)
  expect(data).toMatchObject(messages)
  expect(status).toEqual(DeviceResponseStatus.Ok)
})

test("Status is error when returned messages data is undefined ", async () => {
  ;(DeviceService as unknown as jest.Mock).mockImplementation(() => {
    return {
      request: () => {
        return {
          data: undefined,
        }
      },
    }
  })
  const purePhoneMessagesAdapter = createPurePhoneMessagesAdapter(
    new DeviceService(MuditaDeviceManager, ipcMain)
  )
  const threadId = String(mockPureMessageData[0].threadID)
  const { status } = await purePhoneMessagesAdapter.getMessagesByThreadId(
    threadId
  )
  expect(status).toEqual(DeviceResponseStatus.Error)
})

test("Status is error when returned messages data is undefined ", async () => {
  ;(DeviceService as unknown as jest.Mock).mockImplementation(() => {
    return {
      request: () => {
        return {
          status: DeviceResponseStatus.Ok,
          data: mockAddedPureMessageData,
        }
      },
    }
  })
  const purePhoneMessagesAdapter = createPurePhoneMessagesAdapter(
    new DeviceService(MuditaDeviceManager, ipcMain)
  )
  const { status, data } = await purePhoneMessagesAdapter.addMessage(
    mockAddedNewMessageData
  )
  expect(status).toEqual(DeviceResponseStatus.Ok)
  expect(data).toStrictEqual(mockAddedMessageData)
})
