/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import {
  DeviceFileSystemError,
  DeviceFileSystemEvent,
} from "App/device-file-system/constants"
import { removeFileRequest } from "App/device-file-system/requests"
import { RequestResponseStatus } from "App/core/types/request-response.interface"
import { AppError } from "App/core/errors"

export const removeFile = createAsyncThunk<void, string>(
  DeviceFileSystemEvent.Remove,
  async (payload, { rejectWithValue }) => {
    const response = await removeFileRequest(payload)

    if (response.status !== RequestResponseStatus.Ok) {
      return rejectWithValue(
        new AppError(
          DeviceFileSystemError.Removing,
          "Cannot remove the file",
          response
        )
      )
    }

    return
  }
)
