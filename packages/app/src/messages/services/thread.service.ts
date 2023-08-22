/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Thread } from "App/messages/dto"
import { Thread as PureThread } from "App/device/types/mudita-os/serialport-request.type"
import { DeviceManager } from "App/device-manager/services"
import {
  GetThreadsRequestConfig,
  PaginationBody,
  GetThreadsResponseBody,
  PhoneNumberResponse,
} from "App/device/types/mudita-os"
import {
  Endpoint,
  Method,
  MessagesCategory as PureMessagesCategory,
} from "App/device/constants"
import {
  RequestResponse,
  RequestResponseStatus,
} from "App/core/types/request-response.interface"
import { ThreadPresenter } from "App/messages/presenters"
import { isResponseSuccess, isResponseSuccessWithData } from "App/core/helpers"
import { ThreadRepository } from "App/messages/repositories"
import { getPhoneNumberRequest } from "App/utils/services/utils"

export interface GetThreadsResponse {
  data: Thread[]
  totalCount: number
  nextPage?: PaginationBody
}

export class ThreadService {
  constructor(
    private deviceManager: DeviceManager,
    private threadRepository: ThreadRepository
  ) {}

  public async getThread(id: string): Promise<RequestResponse<Thread>> {
    const threadResult = await this.getThreadRequestViaWorkaround(id)

    if (isResponseSuccessWithData(threadResult)) {
      return threadResult
    } else {
      return {
        status: RequestResponseStatus.Error,
        error: { message: "Get thread: Something went wrong" },
      }
    }
  }

  public async getThreads(
    pagination: PaginationBody
  ): Promise<RequestResponse<GetThreadsResponse>> {
    const body: GetThreadsRequestConfig["body"] = {
      category: PureMessagesCategory.thread,
      ...pagination,
    }

    const response =
      await this.deviceManager.device.request<GetThreadsResponseBody>({
        body,
        endpoint: Endpoint.Messages,
        method: Method.Get,
      })

    if (response.ok && response.data) {
      const data = response.data

      const phoneNumbersPromises = data.entries.map(({ numberID }) => {
        return getPhoneNumberRequest(this.deviceManager, numberID ?? "")
      })
      const phoneNumbers = await Promise.all(phoneNumbersPromises)

      return {
        status: RequestResponseStatus.Ok,
        data: {
          // AUTO DISABLED - fix me if you like :)
          // eslint-disable-next-line @typescript-eslint/unbound-method
          data: data.entries.map((thread) => {
            const phoneNumber = phoneNumbers.find(
              ({ numberID }) => String(numberID) === thread.numberID
            )
            return ThreadPresenter.mapToThread(thread, phoneNumber?.number)
          }),
          nextPage: data.nextPage,
          totalCount: data.totalCount,
        },
      }
    } else {
      return {
        status: RequestResponseStatus.Error,
        error: { message: "Get threads: Something went wrong" },
      }
    }
  }

  // Target method is getThreadRequest. This is workaround to handle no implemented `getThread` API
  private async getThreadRequestViaWorkaround(
    id: string
  ): Promise<RequestResponse<Thread | undefined>> {
    const response = await this.loadAllThreadsInSingleRequest({
      limit: 99999,
      offset: 0,
    })

    if (!isResponseSuccess(response)) {
      return {
        status: RequestResponseStatus.Error,
        error: { message: "Fetch thread: Something went wrong" },
      }
    }

    const thread = response.data?.data.find((thread) => thread.id === id)
    return {
      status: response.status,
      data: thread,
    }
  }

  private async loadAllThreadsInSingleRequest(
    pagination: PaginationBody,
    data: Thread[] = []
  ): Promise<RequestResponse<GetThreadsResponse>> {
    const response = await this.getThreads({
      ...pagination,
      limit: pagination.limit,
    })

    if (response.error || response.data === undefined) {
      return response
    }

    const threads = [...data, ...response.data.data]
    const accumulatedResponse = {
      ...response,
      data: {
        ...response.data,
        data: threads,
      },
    }

    if (response.data.nextPage === undefined) {
      // API no return nextPage (with offset) when client doesn't ask for more than API can return
      // the bellow method is a workaround helper - to remove after implementation by OS
      // https://appnroll.atlassian.net/browse/CP-780
      return returnResponseWithNextPage(accumulatedResponse, pagination)
    }

    const offsetDiff = response.data.nextPage.offset - pagination.offset
    const restLimit = pagination.limit - offsetDiff

    if (restLimit <= 0) {
      return accumulatedResponse
    }

    return this.loadAllThreadsInSingleRequest(
      {
        offset: response.data.nextPage.offset,
        limit: restLimit,
      },
      threads
    )
  }

  public async toggleThreadsReadStatus(
    threads: Thread[]
  ): Promise<RequestResponse<Thread[]>> {
    const results = threads.map(async (thread) => {
      const { ok } = await this.deviceManager.device.request({
        endpoint: Endpoint.Messages,
        method: Method.Put,
        body: {
          category: PureMessagesCategory.thread,
          threadID: Number(thread.id),
          isUnread: !thread.unread,
        },
      })
      return {
        status: ok ? RequestResponseStatus.Ok : RequestResponseStatus.Error,
        thread,
      }
    })

    const errorThreads = (await Promise.all(results))
      .filter(({ status }) => status === RequestResponseStatus.Error)
      .map(({ thread }) => thread)
    const successThreads = (await Promise.all(results))
      .filter(({ status }) => status === RequestResponseStatus.Ok)
      .map(({ thread }) => thread)

    if (errorThreads.length > 0) {
      successThreads.forEach((thread) =>
        this.threadRepository.update(thread, true)
      )

      return {
        status: RequestResponseStatus.Error,
        error: {
          message: "Delete thread: Something went wrong",
          data: errorThreads,
        },
      }
    } else {
      threads.forEach((thread) => this.threadRepository.update(thread, true))

      return {
        status: RequestResponseStatus.Ok,
      }
    }
  }

  public async deleteThreads(
    threadIds: string[]
  ): Promise<RequestResponse<string[]>> {
    const results = threadIds.map(async (id) => {
      const { ok } = await this.deviceManager.device.request({
        endpoint: Endpoint.Messages,
        method: Method.Delete,
        body: { category: PureMessagesCategory.thread, threadID: Number(id) },
      })
      return {
        status: ok ? RequestResponseStatus.Ok : RequestResponseStatus.Error,
        id,
      }
    })

    const errorIds = (await Promise.all(results))
      .filter(({ status }) => status === RequestResponseStatus.Error)
      .map(({ id }) => id)
    const successIds = (await Promise.all(results))
      .filter(({ status }) => status === RequestResponseStatus.Ok)
      .map(({ id }) => id)

    if (errorIds.length > 0) {
      successIds.forEach((id) => this.threadRepository.delete(id, true))

      return {
        status: RequestResponseStatus.Error,
        error: {
          message: "Delete thread: Something went wrong",
          data: errorIds,
        },
      }
    } else {
      threadIds.forEach((id) => this.threadRepository.delete(id, true))

      return {
        status: RequestResponseStatus.Ok,
      }
    }
  }

  async refreshThread(threadId: string): Promise<RequestResponse<undefined>> {
    const response = await this.getThreadRequestViaWorkaround(threadId)

    if (!isResponseSuccess(response)) {
      return {
        status: RequestResponseStatus.Error,
        error: {
          message: "Refresh thread: Something went wrong",
        },
      }
    }

    const thread = response.data

    if (thread) {
      this.threadRepository.update(thread)
    } else {
      this.threadRepository.delete(threadId)
    }

    return {
      status: RequestResponseStatus.Ok,
    }
  }
}

const returnResponseWithNextPage = (
  response: RequestResponse<GetThreadsResponse>,
  pagination: PaginationBody
): RequestResponse<GetThreadsResponse> => {
  if (response.data === undefined) {
    return response
  }

  const offset = pagination.offset + pagination.limit
  const nextPage: PaginationBody | undefined =
    offset < response.data.totalCount
      ? {
          offset,
          limit: 0,
        }
      : undefined

  return {
    ...response,
    data: {
      ...response.data,
      nextPage,
    },
  }
}
