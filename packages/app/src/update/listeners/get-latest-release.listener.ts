/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcMain } from "electron-better-ipc"
import { createClient } from "App/api/mudita-center-server"
import { IpcUpdate } from "App/update/constants"
import { getLatestProductionReleaseParams } from "App/api/mudita-center-server/client"

export const registerGetLatestReleaseListener = () => {
  ipcMain.answerRenderer(
    IpcUpdate.GetLatestRelease,
    async (params: getLatestProductionReleaseParams) => {
      const client = createClient()
      const { data } = await client.getLatestRelease(params)

      return data
    }
  )
}