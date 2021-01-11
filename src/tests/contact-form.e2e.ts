import { startApp, stopApp } from "App/tests/hooks"
import { MenuGroupTestIds } from "Renderer/components/rest/menu/menu-group-test-ids.enum"
import { URL_RECOVERY_MODE } from "Renderer/constants/urls"
import { ModalTestIds } from "Renderer/components/core/modal/modal-test-ids.enum"

let app: any
const incorrectEmail = "e2e"
const email = "e2e@test.com"

beforeEach(async () => {
  app = await startApp()
  await app.client.$(`*[data-testid="icon-Close"]`).click()
  await app.client.pause(1000)
  await app.client.$(`*[data-testid=${MenuGroupTestIds.Backup}]`).click()
  const hash = await app.client.execute(() => window.location.hash)
  expect(hash.value).toEqual(`#${URL_RECOVERY_MODE.root}`)
  await app.client.$(`//*[text()="Contact support"]`).click()
})

afterEach(async () => {
  await stopApp(app)
})

test("user can navigate to the contact form through Backup screen", async () => {
  expect(
    await app.client.isExisting(`//*[text()="Mudita Center Support"]`)
  ).toBe(true)
})

test("contact form informs a user that email is required", async () => {
  await app.client.$(`*[data-testid=${ModalTestIds.ModalActionButton}]`).click()
  expect(await app.client.isExisting(`//*[text()="Email is required"]`)).toBe(
    true
  )
})

test("contact form informs a user that only valid email can be used", async () => {
  await app.client
    .$(`*[data-testid=${ModalTestIds.Email}]`)
    .setValue(incorrectEmail)
  await app.client.$(`*[data-testid=${ModalTestIds.ModalActionButton}]`).click()
  expect(await app.client.isExisting(`//*[text()="Email is invalid"]`)).toBe(
    true
  )
})

test("user can send a message to the support", async () => {
  await app.client.$(`*[data-testid=${ModalTestIds.Email}]`).setValue(email)
  await app.client.$(`*[data-testid=${ModalTestIds.ModalActionButton}]`).click()
  expect(await app.client.isExisting(`//*[text()="Sending"]`)).toBe(true)
})
