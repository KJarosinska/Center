/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ipcRenderer } from "electron-better-ipc"
import { IpcFileSystem } from "App/files-system/constants"
import { CryptoFileOption } from "App/files-system/services/crypto-file-service/crypto-file-service"

const decryptFile = async (
  option: CryptoFileOption
): Promise<Uint8Array | undefined> => {
  return await ipcRenderer.callMain(IpcFileSystem.DecryptFile, option)
}

export default decryptFile
