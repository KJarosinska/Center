/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AnyAction } from "@reduxjs/toolkit"
import thunk from "redux-thunk"
import createMockStore from "redux-mock-store"
import { toggleTrackingRequest } from "App/analytic-data-tracker/requests"
import { updateSettings } from "App/settings/requests"
import { togglePrivacyPolicyAccepted } from "./toggle-privacy-policy-accepted.action"
import logger from "App/__deprecated__/main/utils/logger"

const mockStore = createMockStore([thunk])()

jest.mock("App/__deprecated__/main/utils/logger", () => ({
  enableRollbar: jest.fn(),
  disableRollbar: jest.fn(),
}))
jest.mock("App/analytic-data-tracker/requests", () => ({
  toggleTrackingRequest: jest.fn(),
}))
jest.mock("App/settings/requests", () => ({
  updateSettings: jest.fn(),
}))

afterEach(() => {
  jest.resetAllMocks()
  mockStore.clearActions()
})

test("enables `logging/tracking` functionalities and calls `updateSettings` with `true` value", async () => {
  expect(updateSettings).not.toHaveBeenCalled()
  expect(toggleTrackingRequest).not.toHaveBeenCalled()
  expect(logger.enableRollbar).not.toHaveBeenCalled()

  const {
    meta: { requestId },
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/await-thenable
  } = await mockStore.dispatch(
    togglePrivacyPolicyAccepted(true) as unknown as AnyAction
  )

  expect(mockStore.getActions()).toEqual([
    togglePrivacyPolicyAccepted.pending(requestId, true),
    togglePrivacyPolicyAccepted.fulfilled(true, requestId, true),
  ])
  expect(logger.enableRollbar).toHaveBeenCalled()
  expect(toggleTrackingRequest).toHaveBeenCalledWith(true)
  expect(updateSettings).toHaveBeenCalledWith({
    key: "privacyPolicyAccepted",
    value: true,
  })
})

test("disables `logging/tracking` functionalities and calls `updateSettings` with `false` value", async () => {
  expect(updateSettings).not.toHaveBeenCalled()
  expect(toggleTrackingRequest).not.toHaveBeenCalled()
  expect(logger.disableRollbar).not.toHaveBeenCalled()

  const {
    meta: { requestId },
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/await-thenable
  } = await mockStore.dispatch(
    togglePrivacyPolicyAccepted(false) as unknown as AnyAction
  )

  expect(mockStore.getActions()).toEqual([
    togglePrivacyPolicyAccepted.pending(requestId, false),
    togglePrivacyPolicyAccepted.fulfilled(false, requestId, false),
  ])
  expect(logger.disableRollbar).toHaveBeenCalled()
  expect(toggleTrackingRequest).toHaveBeenCalledWith(false)
  expect(updateSettings).toHaveBeenCalledWith({
    key: "privacyPolicyAccepted",
    value: false,
  })
})
