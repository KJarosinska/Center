/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { MainProcessIpc } from "electron-better-ipc"
import { EventEmitter } from "events"
import { MetadataStore } from "App/metadata/services"
import { FileSystemService } from "App/file-system/services/file-system.service.refactored"
import { AppLogger } from "App/__deprecated__/main/utils/logger"
import { IndexStorage } from "App/index-storage/types"
import { BaseModule } from "App/core/module"
import { TemplateModel } from "App/templates/models"
import { TemplateRepository } from "App/templates/repositories"
import { TemplateService } from "App/templates/services"
import { TemplateController } from "App/templates/controllers"
import { DeviceManager } from "App/device-manager/services"

export class TemplateModule extends BaseModule {
  constructor(
    public index: IndexStorage,
    public deviceManager: DeviceManager,
    public keyStorage: MetadataStore,
    public logger: AppLogger,
    public ipc: MainProcessIpc,
    public eventEmitter: EventEmitter,
    public fileSystem: FileSystemService
  ) {
    super(
      index,
      deviceManager,
      keyStorage,
      logger,
      ipc,
      eventEmitter,
      fileSystem
    )
    const templateModel = new TemplateModel(this.index, this.eventEmitter)
    const templateRepository = new TemplateRepository(templateModel)
    const templateService = new TemplateService(
      this.deviceManager,
      templateRepository
    )
    const templateController = new TemplateController(templateService)

    this.models = [templateModel]
    this.controllers = [templateController]
  }
}
