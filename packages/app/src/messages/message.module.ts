/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { MainProcessIpc } from "electron-better-ipc"
import { EventEmitter } from "events"
import { DeviceService } from "App/backend/device-service"
import { MetadataStore } from "App/metadata/services"
import { AppLogger } from "App/main/utils/logger"
import { FileSystemService } from "App/file-system/services/file-system.service.refactored"
import { IndexStorage } from "App/index-storage/types"
import { BaseModule } from "App/core/module"
import { MessageModel, ThreadModel } from "App/messages/models"

export class MessageModule extends BaseModule {
  private messageModel: MessageModel
  private threadModel: ThreadModel

  constructor(
    public index: IndexStorage,
    public deviceService: DeviceService,
    public keyStorage: MetadataStore,
    public logger: AppLogger,
    public ipc: MainProcessIpc,
    public eventEmitter: EventEmitter,
    public fileSystem: FileSystemService
  ) {
    super(
      index,
      deviceService,
      keyStorage,
      logger,
      ipc,
      eventEmitter,
      fileSystem
    )

    this.messageModel = new MessageModel(this.index, this.eventEmitter)
    this.threadModel = new ThreadModel(this.index, this.eventEmitter)

    this.models = [this.messageModel, this.threadModel]
  }
}