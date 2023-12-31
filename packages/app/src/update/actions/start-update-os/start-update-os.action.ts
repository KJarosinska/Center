/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { AppError } from "App/core/errors"
import { removeFile } from "App/device-file-system"
import { DiagnosticsFilePath } from "App/device/constants"
import { setStateForInstalledRelease } from "App/update/actions/base.action"
import {
  ReleaseProcessState,
  UpdateError,
  UpdateErrorServiceErrors,
  UpdateOsEvent,
} from "App/update/constants"
import { OsRelease } from "App/update/dto"
import { isBatteryLevelEnoughForUpdate } from "App/update/helpers"
import { removeDownloadedOsUpdates, startOsUpdate } from "App/update/requests"
import { ReduxRootState } from "App/__deprecated__/renderer/store"
import { setUpdatingRequest } from "App/device/requests/set-updating.request"
import {
  trackOsUpdate,
  TrackOsUpdateOptions,
  TrackOsUpdateState,
} from "App/analytic-data-tracker/helpers"
import { checkUpdate } from "App/update/requests/checkUpdate.request"
import { setRestarting } from "App/device"

interface Params {
  releases: OsRelease[]
}

const getErrorType = (error?: UpdateErrorServiceErrors): UpdateError => {
  if (error === UpdateErrorServiceErrors.NotEnoughSpace) {
    return UpdateError.NotEnoughSpace
  }

  if (error === UpdateErrorServiceErrors.OnboardingNotComplete) {
    return UpdateError.OnboardingNotComplete
  }

  return UpdateError.UpdateOsProcess
}

export const startUpdateOs = createAsyncThunk<
  void,
  Params,
  {
    state: ReduxRootState
    rejectValue: AppError<UpdateError>
  }
>(
  UpdateOsEvent.StartOsUpdateProcess,
  async ({ releases }, { dispatch, rejectWithValue, getState }) => {
    void setUpdatingRequest(true)
    let state = getState()
    const batteryLevel = state.device.data?.batteryLevel ?? 0
    const deviceType = state.device.deviceType
    const externalUsageDevice = state.device.externalUsageDevice ?? false

    if (deviceType === null) {
      return rejectWithValue(
        new AppError(UpdateError.UpdateOsProcess, "deviceType is a null")
      )
    }

    if (!isBatteryLevelEnoughForUpdate(batteryLevel)) {
      return rejectWithValue(
        new AppError(
          UpdateError.TooLowBattery,
          "Device has too low battery level"
        )
      )
    }

    await dispatch(removeFile(DiagnosticsFilePath.UPDATER_LOG))

    for (const release of releases) {
      state = getState()

      const trackOsUpdateOptions: Omit<TrackOsUpdateOptions, "state"> = {
        deviceType,
        fromOsVersion: state.device.data?.osVersion,
        toOsVersion: release.version,
      }

      void trackOsUpdate(
        {
          ...trackOsUpdateOptions,
          state: TrackOsUpdateState.Start,
        },
        externalUsageDevice
      )

      dispatch(
        setStateForInstalledRelease({
          state: ReleaseProcessState.InProgress,
          version: release.version,
        })
      )

      if (release.version !== state.device.data?.osVersion) {
        dispatch(setRestarting(true))
        const updateResult = await startOsUpdate({
          fileName: release.file.name,
        })
        dispatch(setRestarting(false))
        const result = updateResult.ok ? await checkUpdate() : updateResult
        if (!result.ok) {
          void setUpdatingRequest(false)

          const errorType = getErrorType(result.error?.type)

          void trackOsUpdate(
            {
              ...trackOsUpdateOptions,
              state: TrackOsUpdateState.Fail,
            },
            externalUsageDevice
          )

          return rejectWithValue(
            new AppError(errorType, "Device updating process failed")
          )
        }
      }

      void trackOsUpdate(
        {
          ...trackOsUpdateOptions,
          state: TrackOsUpdateState.Success,
        },
        externalUsageDevice
      )

      dispatch(
        setStateForInstalledRelease({
          state: ReleaseProcessState.Done,
          version: release.version,
        })
      )
    }

    void removeDownloadedOsUpdates()

    void setUpdatingRequest(false)

    return
  }
)
