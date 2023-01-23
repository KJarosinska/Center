/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { State } from "App/core/constants"
import { AppError } from "App/core/errors"
import {
  DownloadState,
  SilentCheckForUpdateState,
  UpdateError,
} from "App/update/constants"
import { OsRelease, ProcessedRelease } from "App/update/dto"

export interface UpdateOsState {
  updateOsState: State
  checkForUpdateState: State
  silentCheckForUpdate: SilentCheckForUpdateState
  downloadState: DownloadState
  error: AppError<UpdateError> | null
  needsForceUpdate: boolean
  data: {
    allReleases: OsRelease[] | null
    availableReleasesForUpdate: OsRelease[] | null
    downloadedProcessedReleases: ProcessedRelease[] | null
    updateProcessedReleases: ProcessedRelease[] | null
  }
}
