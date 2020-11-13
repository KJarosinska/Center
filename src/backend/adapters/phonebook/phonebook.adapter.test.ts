import { RequestConfig } from "pure/dist/phone-port.types"
import createPhonebook from "Backend/adapters/phonebook/phonebook.adapter"
import PureNodeService from "Backend/pure-node-service"

const mockPureData = [
  {
    address: "6 Czeczota St.\n02600 Warsaw",
    altName: "Boligłowa",
    blocked: false,
    favourite: true,
    id: 19,
    numbers: [Array],
    priName: "Alek",
  }
]

jest.mock("Backend/pure-node-service", () => {
  return jest.fn().mockImplementation(() => {
    return {
      request: ({ body }: RequestConfig) => {
        if (body.count === true) {
          return { data: { count: 10 }, status: "ok" }
        } else {
          return {
            data: mockPureData,
            status: "ok",
          }
        }
      },
    }
  })
})

// @ts-ignore
const phonebook = createPhonebook(new PureNodeService())

test("return mapped contacts from pure to Contact model", async () => {
  const { data = [] } = await phonebook.getContacts()

  expect(data[0]).toMatchObject({
    blocked: false,
    favourite: true,
    secondaryPhoneNumber: "",
    firstAddressLine: "6 Czeczota St.",
    secondAddressLine: "02600 Warsaw",
    id: "19",
    firstName: "Boligłowa",
    lastName: "Alek",
    ice: false,
    note: "",
    email: "",
  })
})
