import mockPureNodeService from "Backend/mock-pure-node-service"
import { ipcMain } from "electron-better-ipc"
import { IpcRequest } from "Common/requests/ipc-request.enum"
import registerGetContactsRequest from "Backend/requests/phonebook/get-contacts.request"
import createPhonebook from "Backend/adapters/phonebook/phonebook.adapter"
import Adapters from "Backend/adapters/adapters.interface"
import PureNodeService from "Backend/pure-node-service"

jest.mock("Backend/pure-node-service", () => mockPureNodeService())

const adapters = {
// @ts-ignore
  phonebook: createPhonebook(new PureNodeService())
}  as unknown as Adapters

test("return mapped contacts from pure to Contact model", async () => {
  registerGetContactsRequest(adapters)

  const [result] = await (ipcMain as any)._flush(IpcRequest.GetContacts)

  const { data = [] } =  await result;
  expect(data[0]).toMatchObject({
    blocked: false,
    favourite: true,
    primaryPhoneNumber: "500400300",
    secondaryPhoneNumber: "",
    firstAddressLine: "6 Czeczota St.",
    secondAddressLine: "02600 Warsaw",
    id: "19",
    firstName: "Alek",
    lastName: "Boligłowa",
    ice: false,
    note: "",
    email: "",
  })
})
