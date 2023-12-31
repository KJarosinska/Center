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
import { DataSyncService } from "App/data-sync/services/data-sync.service"
import { DeviceConnectionObserver } from "App/data-sync/observers"
import { DataSyncController } from "App/data-sync/controllers"
import { DeviceManager } from "App/device-manager/services"

export class DataSyncModule extends BaseModule {
  private dataSyncService: DataSyncService
  private deviceConnectionObserver: DeviceConnectionObserver
  private dataSyncController: DataSyncController

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

    this.dataSyncService = new DataSyncService(
      this.index,
      this.deviceManager,
      this.keyStorage,
      this.fileSystem
    )
    this.deviceConnectionObserver = new DeviceConnectionObserver(
      this.deviceManager,
      this.keyStorage,
      this.dataSyncService,
      this.ipc,
      this.eventEmitter
    )
    this.dataSyncController = new DataSyncController(
      this.index,
      this.dataSyncService
    )

    this.controllers = [this.dataSyncController]

    this.observers = [this.deviceConnectionObserver]
  }
}
