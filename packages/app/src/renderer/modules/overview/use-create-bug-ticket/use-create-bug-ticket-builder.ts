/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { useState } from "react"
import { formatDate } from "Renderer/modules/overview/format-date"
import {
  FreshdeskTicketData,
  FreshdeskTicketDataType,
} from "Renderer/modules/overview/create-freshdesk-ticket/create-freshdesk-ticket"
import { DependencyUseCreateBugTicket } from "Renderer/modules/overview/use-create-bug-ticket/use-create-bug-ticket"

export enum CreateBugTicketResponseStatus {
  Ok = "ok",
  Error = "error",
}

interface CreateBugTicketResponseError {
  message: string
  data?: unknown
}

interface CreateBugTicketResponse {
  status: CreateBugTicketResponseStatus
  error?: CreateBugTicketResponseError
}

export interface CreateBugTicket {
  sendRequest: (
    data: Omit<FreshdeskTicketData, "type" | "attachments">
  ) => Promise<CreateBugTicketResponse>
  error: CreateBugTicketResponseError | undefined
}

const todayFormatDate = formatDate(new Date())
export const attachedFileName = `tmp-${todayFormatDate}.zip`

const useCreateBugTicketBuilder = ({
  getAppPath,
  writeFile,
  getAppLogs,
  getDeviceLogs,
  createFile,
  writeGzip,
  createFreshdeskTicket,
}: DependencyUseCreateBugTicket) => (): CreateBugTicket => {
  const [error, setError] = useState<CreateBugTicketResponseError>()
  const sendRequest = async ({
    email,
    subject,
    description,
  }: Omit<
    FreshdeskTicketData,
    "type" | "attachments"
  >): Promise<CreateBugTicketResponse> => {
    const appLogs = await getAppLogs()
    const { data: deviceLogs = "" } = await getDeviceLogs()
    const filePath = `${getAppPath()}/tmp-${todayFormatDate}`

    const mcFileName = `mc-${todayFormatDate}.txt`
    const mcWriteResponse = await writeFile({
      filePath,
      data: appLogs,
      fileName: mcFileName,
    })

    if (!mcWriteResponse) {
      const response = returnResponseError(
        "Create Bug Ticket - WriteFileSync error"
      )
      setError(response.error)
      return response
    }

    const pureFileName = `pure-${todayFormatDate}.txt`
    const pureWriteResponse = await writeFile({
      filePath,
      data: deviceLogs,
      fileName: pureFileName,
    })

    if (!pureWriteResponse) {
      const response = returnResponseError(
        "Create Bug Ticket - WriteFileSync error"
      )
      setError(response.error)
      return response
    }

    const writeGzipResponse = await writeGzip({ filePath })
    const gzipFilePath = `${filePath}.zip`

    if (!writeGzipResponse) {
      const response = returnResponseError(
        "Create Bug Ticket - writeGzip error"
      )
      setError(response.error)
      return response
    }

    let attachments = []
    try {
      attachments = [createFile(gzipFilePath)]
    } catch {
      const response = returnResponseError(
        "Create Bug Ticket - bug in creates attachments"
      )
      setError(response.error)
      return response
    }

    const data = {
      email,
      subject,
      description,
      attachments,
      type: FreshdeskTicketDataType.Problem,
    }

    try {
      await createFreshdeskTicket(data)
      return {
        status: CreateBugTicketResponseStatus.Ok,
      }
    } catch (error) {
      setError(error)
      if (error?.response?.data) {
        return {
          status: CreateBugTicketResponseStatus.Error,
          error: {
            message: error.response.data.description,
            data: error.response.data.errors,
          },
        }
      } else {
        return returnResponseError("Create Bug Ticket - Bad Request")
      }
    }
  }
  return { sendRequest, error }
}

const returnResponseError = (
  message: string
): {
  status: CreateBugTicketResponseStatus.Error
  error: CreateBugTicketResponseError
} => {
  return {
    status: CreateBugTicketResponseStatus.Error,
    error: {
      message,
    },
  }
}

export default useCreateBugTicketBuilder
