/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import store from "App/__deprecated__/renderer/store"
import { unlockedDevice } from "App/device"
import { DeviceIpcEvent } from "App/device/constants/device-ipc-event.constant"
import { Device } from "App/device/modules/device"
import { IpcRendererEvent } from "electron"

const deviceUnlockedHandler = (
  _: IpcRendererEvent,
  { agreementAccepted }: Device
): void => {
  void store.dispatch(unlockedDevice(agreementAccepted))
}

export const registerDeviceUnlockedListener = (): (() => void) => {
  ipcRenderer.on(DeviceIpcEvent.DeviceUnlocked, deviceUnlockedHandler)

  return () => {
    ipcRenderer.off(DeviceIpcEvent.DeviceUnlocked, deviceUnlockedHandler)
  }
}
