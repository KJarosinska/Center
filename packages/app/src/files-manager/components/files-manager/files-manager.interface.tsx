/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceType } from "App/device/constants"
import { State } from "App/core/constants"
import { AppError } from "App/core/errors"
import { DiskSpaceCategoryType } from "App/files-manager/constants"
import { IconType } from "App/__deprecated__/renderer/components/core/icon/icon-type"
import { File } from "App/files-manager/dto"
import { DeviceDirectory } from "App/files-manager/constants"

export interface FilesManagerProps {
  deviceType: DeviceType | null
  memorySpace?: MemorySpace
  loading: State
  uploading: State
  uploadingFileCount: number
  deleting: State
  deletingFileCount: number
  files: File[] | null
  getFiles: (directory: DeviceDirectory) => void
  resetAllItems: () => void
  selectAllItems: () => void
  toggleItem: (id: string) => void
  selectedItems: string[]
  allItemsSelected: boolean
  deleteFiles: (ids: string[]) => void
  resetDeletingState: () => void
  resetUploadingState: () => void
  resetUploadingStateAfterSuccess: () => void
  uploadBlocked: boolean
  error: AppError | null
  setDeletingFileCount: (count: number) => void
  pendingFilesCount: number
  abortPendingUpload: () => void
  continuePendingUpload: () => void
}

export interface DiskSpaceCategory {
  type: DiskSpaceCategoryType
  size: number
  filesAmount?: number
  color: string
  icon: IconType
  label: string
}

export interface MemorySpace {
  reservedSpace: number
  usedUserSpace: number
  total: number
}

export interface FileServiceState {
  deleting: boolean
  deletingConfirmation: boolean
  deletingInfo: boolean
  deletingFailed: boolean
  uploading: boolean
  uploadingInfo: boolean
  uploadingFailed: boolean
}
