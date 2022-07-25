/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { PayloadAction } from "@reduxjs/toolkit"
import {
  filesManagerReducer,
  initialState,
} from "App/files-manager/reducers/files-manager.reducer"
import {
  fulfilledAction,
  pendingAction,
  rejectedAction,
} from "App/__deprecated__/renderer/store/helpers"
import { GetFilesError } from "App/files-manager/errors"
import { FilesManagerEvent } from "App/files-manager/constants"
import {
  MetadataDeviceFile,
  ResultState,
} from "App/files-manager/reducers/files-manager.interface"

test("empty event returns initial state", () => {
  expect(filesManagerReducer(undefined, {} as any)).toEqual(initialState)
})

describe("Getting files functionality", () => {
  test("Event: `getFiles/pending` change `resultState` to Loading", () => {
    expect(
      filesManagerReducer(undefined, {
        type: pendingAction(FilesManagerEvent.GetFiles),
      })
    ).toEqual({
      ...initialState,
      resultState: ResultState.Loading,
    })
  })

  test("Event: `getFiles/fulfilled` change `resultState` to Loaded", () => {
    expect(
      filesManagerReducer(undefined, {
        type: fulfilledAction(FilesManagerEvent.GetFiles),
      })
    ).toEqual({
      ...initialState,
      resultState: ResultState.Loaded,
    })
  })

  test("Event: `getFiles/rejected` change `resultState` to Error", () => {
    const errorMock = new GetFilesError("I'm error")

    expect(
      filesManagerReducer(undefined, {
        type: rejectedAction(FilesManagerEvent.GetFiles),
        payload: errorMock,
      })
    ).toEqual({
      ...initialState,
      resultState: ResultState.Error,
      error: errorMock,
    })
  })
})

describe("Set Files data functionality", () => {
  const file: MetadataDeviceFile = {
    id: "user/music/example_file_name.mp3",
    size: 1234,
    name: "example_file_name.mp3",
    type: "mp3",
  }

  test("Event: SetFiles set files field", () => {
    const setFilesAction: PayloadAction<MetadataDeviceFile[]> = {
      type: FilesManagerEvent.SetFiles,
      payload: [file],
    }

    expect(
      filesManagerReducer(
        {
          ...initialState,
          files: [file],
        },
        setFilesAction
      )
    ).toEqual({
      ...initialState,
      files: [file],
    })
  })
})
