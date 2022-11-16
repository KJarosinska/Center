/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { join } from "path"
import { ResultObject, Result } from "App/core/builder"
import { AppError } from "App/core/errors"
import { RequestResponseStatus } from "App/core/types/request-response.interface"
import { SettingsService } from "App/settings/services"
import { UpdateOS } from "App/update/dto"
import { UpdateError } from "App/update/constants"
import {
  Endpoint,
  Method,
  DeviceType,
  PhoneLockCategory,
} from "App/device/constants"
import { DeviceFileSystemService } from "App/device-file-system/services"
import { DeviceInfo } from "App/device/types/mudita-os/serialport-request.type"

// DEPRECATED
import DeviceService from "App/__deprecated__/backend/device-service"

export class DeviceUpdateService {
  constructor(
    private settingsService: SettingsService,
    private deviceService: DeviceService,
    private deviceFileSystem: DeviceFileSystemService
  ) {}

  public async updateOs(payload: UpdateOS): Promise<ResultObject<boolean>> {
    const deviceInfoResult = await this.getDeviceInfo()

    if (!deviceInfoResult.ok || !deviceInfoResult.data) {
      return Result.failed(
        new AppError(
          UpdateError.CannotGetOsVersion,
          "Current os version request failed"
        )
      )
    }

    const filePath = join(
      this.settingsService.getByKey("osDownloadLocation") as string,
      payload.fileName
    )

    const fileResponse = await this.deviceFileSystem.uploadFileLocally({
      filePath,
      targetPath: "/sys/user/update.tar",
    })

    if (!fileResponse.ok || !fileResponse.data) {
      return Result.failed(
        new AppError(
          UpdateError.UpdateFileUpload,
          `Cannot upload ${filePath} to device`
        )
      )
    }

    const pureUpdateResponse = await this.deviceService.request({
      endpoint: Endpoint.Update,
      method: Method.Post,
      body: {
        update: true,
        reboot: true,
      },
    })

    if (pureUpdateResponse.status !== RequestResponseStatus.Ok) {
      return Result.failed(
        new AppError(UpdateError.UpdateCommand, "Cannot restart device")
      )
    }

    const deviceRestartResponse = await this.waitUntilDeviceRestart()

    if (!deviceRestartResponse.ok) {
      return deviceRestartResponse
    }

    if (
      this.deviceService.currentDevice?.deviceType === DeviceType.MuditaPure
    ) {
      const deviceUnlockedResponse = await this.waitUntilDeviceUnlocked()

      if (!deviceUnlockedResponse.ok) {
        return deviceUnlockedResponse
      }
    }

    const deviceInfoAfterUpdateResult = await this.getDeviceInfo()

    if (!deviceInfoAfterUpdateResult.ok || !deviceInfoAfterUpdateResult.data) {
      return Result.failed(
        new AppError(
          UpdateError.CannotGetOsVersion,
          "New os version request failed"
        )
      )
    }

    const afterUpdateOsVersion = deviceInfoAfterUpdateResult.data.version
    const beforeUpdateOsVersion = deviceInfoResult.data.version

    if (beforeUpdateOsVersion === afterUpdateOsVersion) {
      return Result.failed(
        new AppError(
          UpdateError.VersionDoesntChanged,
          "The version OS isn't changed"
        )
      )
    }

    return Result.success(true)
  }

  private async getDeviceInfo(): Promise<ResultObject<DeviceInfo>> {
    const { status, data, error } = await this.deviceService.request({
      endpoint: Endpoint.DeviceInfo,
      method: Method.Get,
    })

    if (status !== RequestResponseStatus.Ok || data === undefined) {
      return Result.failed(
        new AppError(
          UpdateError.CannotGetDeviceInfo,
          error?.message || "Device info request failed"
        )
      )
    } else {
      return Result.success(data)
    }
  }

  private async getUnlockDeviceStatus(): Promise<
    ResultObject<RequestResponseStatus>
  > {
    const { status } = await this.deviceService.request({
      endpoint: Endpoint.Security,
      method: Method.Get,
      body: { category: PhoneLockCategory.Status },
    })

    return Result.success(status)
  }

  private async waitUntilDeviceRestart(
    index = 0,
    deviceType = this.deviceService.currentDevice?.deviceType,
    timeout = 10000,
    callsMax = 60
  ): Promise<ResultObject<boolean>> {
    if (index === callsMax) {
      return Result.failed(
        new AppError(
          UpdateError.RequestLimitExceeded,
          "The device no restart successful in 10 minutes"
        )
      )
    }

    let response

    if (deviceType === DeviceType.MuditaHarmony) {
      response = await this.getDeviceInfo()
    } else {
      response = await this.getUnlockDeviceStatus()
    }

    if (
      index !== 0 &&
      (response.data === RequestResponseStatus.Ok ||
        response.data === RequestResponseStatus.PhoneLocked)
    ) {
      return Result.success(true)
    } else {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(this.waitUntilDeviceRestart(++index, deviceType))
        }, timeout)
      })
    }
  }

  private async waitUntilDeviceUnlocked(
    index = 0,
    timeout = 5000,
    callsMax = 120
  ): Promise<ResultObject<boolean>> {
    if (index === callsMax) {
      return Result.failed(
        new AppError(
          UpdateError.RequestLimitExceeded,
          "The device isn't unlocked by user in 10 minutes"
        )
      )
    }

    const response = await this.getUnlockDeviceStatus()

    if (
      index !== 0 &&
      response.ok &&
      response.data === RequestResponseStatus.Ok
    ) {
      return Result.success(true)
    } else {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(this.waitUntilDeviceUnlocked(++index))
        }, timeout)
      })
    }
  }
}
