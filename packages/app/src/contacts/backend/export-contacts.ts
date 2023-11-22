/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { BrowserWindow } from "electron"
import fs from "fs-extra"
import { ipcMain } from "electron-better-ipc"
import { IpcRequest } from "App/__deprecated__/common/requests/ipc-request.enum"
import { Contact } from "App/contacts/reducers/contacts.interface"
import { app, dialog, shell } from "electron"
import mapContactsToVCardStrings from "App/contacts/helpers/convert-contacts/map-contacts-to-v-card-strings"
import { intl } from "App/__deprecated__/renderer/utils/intl"
import path from "path"
import { defineMessages } from "react-intl"
import { createFullName } from "App/contacts/helpers/contacts.helpers"
import logger from "App/__deprecated__/main/utils/logger"
import { ExportContactsResult } from "App/contacts/constants"

const messages = defineMessages({
  dialogTitle: { id: "module.contacts.exportSaveDialogTitle" },
  defaultFilename: { id: "module.contacts.exportDefaultFilename" },
  button: { id: "module.contacts.exportButton" },
})

// workaround for https://github.com/electron/electron/issues/21935
const getFileName = (contacts: Contact[]) => {
  return `${intl.formatMessage(messages.defaultFilename, {
    name: createFullName(contacts[0]),
    contactsLeft: contacts.length - 1,
  })}.vcf`
}

const registerContactsExportListener = (win: BrowserWindow): void => {
  ipcMain.answerRenderer<Contact[], Promise<ExportContactsResult>>(
    IpcRequest.ExportContacts,
    async (contacts) => {
      //

      win.setAlwaysOnTop(false)
      const { canceled, filePath } = await dialog.showSaveDialog(win, {
        title: intl.formatMessage(messages.dialogTitle, {
          count: contacts.length,
        }),
        defaultPath: path.join(app.getPath("documents"), getFileName(contacts)),
        properties: ["createDirectory", "showOverwriteConfirmation"],
        filters: [{ name: "vcf", extensions: ["vcf"] }],
      })
      win.setAlwaysOnTop(true)

      if (canceled) {
        return ExportContactsResult.Cancelled
      }
      try {
        if (!canceled && filePath) {
          await fs.writeFile(
            filePath,
            mapContactsToVCardStrings(contacts),
            "utf-8"
          )
          shell.showItemInFolder(filePath)
          return ExportContactsResult.Ok
        }
      } catch (error) {
        logger.error(`Export contacts error. Data: ${JSON.stringify(error)}`)
      }
      return ExportContactsResult.Failed
    }
  )
}

export default registerContactsExportListener
