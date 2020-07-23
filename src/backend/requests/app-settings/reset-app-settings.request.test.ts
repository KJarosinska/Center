import getFakeAdapters from "App/tests/get-fake-adapters"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import { ipcMain } from "electron-better-ipc"
import registerAppSettingsResetRequest from "Backend/requests/app-settings/reset-app-settings.request"

test("resets app settings properly", async () => {
  registerAppSettingsResetRequest(getFakeAdapters())
  const [result] = (ipcMain as any)._flush(IpcRequest.ResetAppSettings)
  expect(await result).toMatchInlineSnapshot(`undefined`)
})
