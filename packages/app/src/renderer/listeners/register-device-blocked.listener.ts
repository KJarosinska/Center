/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { IpcEmitter } from "Common/emitters/ipc-emitter.enum"

const registerDeviceBlockedListener = (
  listener: (event: any, props: boolean) => void
): void => {
  ipcRenderer.on(IpcEmitter.DeviceBlocked, listener)
}

export const removeDeviceBlockedListener = (
  listener: (event: any, props: boolean) => void
): void => {
  ipcRenderer.removeListener(IpcEmitter.DeviceBlocked, listener)
}

export default registerDeviceBlockedListener
