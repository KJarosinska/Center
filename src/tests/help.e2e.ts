import { startApp, stopApp } from "App/tests/hooks"
import { MenuGroupTestIds } from "Renderer/components/rest/menu/menu-group-test-ids.enum"

let app: any

beforeEach(async () => {
  app = await startApp()
})

afterEach(async () => {
  await stopApp(app)
})

test("help link opens new window", async () => {
  const initialWindowCount = await app.client
    .waitUntilWindowLoaded()
    .getWindowCount()
  expect(initialWindowCount).toEqual(1)
  await app.client.$(`*[data-testid=${MenuGroupTestIds.Help}]`).click()
  const windowCountAfterHelpClick = await app.client
    .waitUntilWindowLoaded()
    .getWindowCount()
  expect(windowCountAfterHelpClick).toEqual(2)
})