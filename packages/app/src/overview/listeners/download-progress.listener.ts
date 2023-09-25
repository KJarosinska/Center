/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { PureOsDownloadChannels } from "App/__deprecated__/main/functions/register-pure-os-download-listener"
import { DownloadProgress } from "App/__deprecated__/renderer/interfaces/file-download.interface"
import { IpcRendererEvent } from "electron/renderer"

export const registerDownloadProgressListener = (
  listener: (event: IpcRendererEvent, progress: DownloadProgress) => void
): void => {
  ipcRenderer.on(PureOsDownloadChannels.progress, listener)
}

export const removeDownloadProgressListener = (
  listener: (event: IpcRendererEvent, progress: DownloadProgress) => void
): void => {
  ipcRenderer.removeListener(PureOsDownloadChannels.progress, listener)
}
