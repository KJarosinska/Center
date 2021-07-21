/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import {
  WriteData,
  WriteFileEvents,
} from "App/main/functions/register-write-file-listener"

const writeFile = async (data: WriteData): Promise<boolean> => {
  return await ipcRenderer.callMain(WriteFileEvents.Write, data)
}

export default writeFile