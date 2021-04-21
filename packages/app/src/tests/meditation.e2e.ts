/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { enablePhoneSimulation, startApp, stopApp } from "App/tests/hooks"
import { MenuGroupTestIds } from "Renderer/components/rest/menu/menu-group-test-ids.enum"
import { URL_MAIN } from "Renderer/constants/urls"
import { ChartType } from "Renderer/components/rest/meditation/stats/meditation-stats.enum"
import localeEn from "Renderer/locales/default/en-US.json"
import { Application } from "spectron";

let app: Application

beforeEach(async () => {
  app = await startApp(true)
  await enablePhoneSimulation(app)
  await app.client.waitUntil(() =>
    app.client.$(`*[data-testid=${MenuGroupTestIds.Meditation}]`).isVisible()
  )
})

afterEach(async () => {
  await stopApp(app)
})

test.skip("menu button takes user to correct page", async () => {
  await app.client.$(`*[data-testid=${MenuGroupTestIds.Meditation}]`).click()
  const hash = await app.client.execute(() => window.location.hash)
  expect(hash.value).toEqual(`#${URL_MAIN.meditation}`)
})

test.skip("initial filter is set to weekly", async () => {
  await app.client.$(`*[data-testid=${MenuGroupTestIds.Meditation}]`).click()
  expect(
    await app.client.isExisting(`*[data-testid=${ChartType.Monthly}]`)
  ).toBeFalsy()
  expect(
    await app.client.isExisting(`*[data-testid=${ChartType.Yearly}]`)
  ).toBeFalsy()
  expect(
    await app.client.isExisting(`*[data-testid=${ChartType.Weekly}]`)
  ).toBeTruthy()
})

test.skip("filter can be changed back to weekly", async () => {
  await app.client.$(`*[data-testid=${MenuGroupTestIds.Meditation}]`).click()
  expect(
    await app.client.isExisting(`*[data-testid=${ChartType.Monthly}]`)
  ).toBeFalsy()
  expect(
    await app.client.isExisting(`*[data-testid=${ChartType.Yearly}]`)
  ).toBeFalsy()
  expect(
    await app.client.isExisting(`*[data-testid=${ChartType.Weekly}]`)
  ).toBeTruthy()
  await app.client
    .$(`//button[p[text()='${localeEn["component.buttonMonthly"]}']]`)
    .click()
  await app.client
    .$(`//button[p[text()='${localeEn["component.textToday"]}']]`)
    .click()
  expect(
    await app.client.isExisting(`*[data-testid=${ChartType.Monthly}]`)
  ).toBeFalsy()
  expect(
    await app.client.isExisting(`*[data-testid=${ChartType.Yearly}]`)
  ).toBeFalsy()
  expect(
    await app.client.isExisting(`*[data-testid=${ChartType.Weekly}]`)
  ).toBeTruthy()
})

test.skip("filter can be changed to monthly", async () => {
  await app.client.$(`*[data-testid=${MenuGroupTestIds.Meditation}]`).click()
  await app.client
    .$(`//button[p[text()='${localeEn["component.buttonMonthly"]}']]`)
    .click()
  expect(
    await app.client.isExisting(`*[data-testid=${ChartType.Weekly}]`)
  ).toBeFalsy()
  expect(
    await app.client.isExisting(`*[data-testid=${ChartType.Yearly}]`)
  ).toBeFalsy()
  expect(
    await app.client.isExisting(`*[data-testid=${ChartType.Monthly}]`)
  ).toBeTruthy()
})

test.skip("filter can be changed to yearly", async () => {
  await app.client.$(`*[data-testid=${MenuGroupTestIds.Meditation}]`).click()
  await app.client
    .$(`//button[p[text()='${localeEn["component.textYearly"]}']]`)
    .click()
  expect(
    await app.client.isExisting(`*[data-testid=${ChartType.Weekly}]`)
  ).toBeFalsy()
  expect(
    await app.client.isExisting(`*[data-testid=${ChartType.Monthly}]`)
  ).toBeFalsy()
  expect(
    await app.client.isExisting(`*[data-testid=${ChartType.Yearly}]`)
  ).toBeTruthy()
})