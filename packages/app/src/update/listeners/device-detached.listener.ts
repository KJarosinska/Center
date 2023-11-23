/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import store from "App/__deprecated__/renderer/store"
import { ListenerEvent } from "App/device-manager/constants"
import { handleActiveDeviceDetached } from "App/update/actions"
import { resetUploadingState } from "App/files-manager/actions"
import { setConnectionStatus } from "App/device"

const activeDeviceDetachedHandler = (_: unknown, _data: string): void => {
  void store.dispatch(resetUploadingState())
  void store.dispatch(setConnectionStatus(false))
  void store.dispatch(handleActiveDeviceDetached())
}

export const registerActiveDeviceDetachedListener =
  (): (() => void) => {
    ipcRenderer.on(ListenerEvent.ActiveDeviceDetached, activeDeviceDetachedHandler)

    return () => {
      ipcRenderer.off(ListenerEvent.ActiveDeviceDetached, activeDeviceDetachedHandler)
    }
  }
