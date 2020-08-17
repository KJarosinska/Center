import { Slicer } from "@rematch/select"
import { Contact, StoreData } from "Renderer/models/phone/phone.interface"
import {
  BaseContactModel,
  ContactID,
  Phone,
} from "Renderer/models/phone/phone.typings"

import {
  addContacts,
  editContact,
  removeContact,
  revokeField,
  generateSortedStructure,
} from "Renderer/models/phone/phone.helpers"

export const initialState: Phone = {
  db: {},
  collection: [],
}

let writeTrials = 0
let failedTrials = 0

/**
 * Probably implement some kind of UI integration with this, to tell user
 * that the data is only stored in the app at the moment.
 *
 * We should keep data in here, so the user won't lose the changes
 * if something is wrong on the hardware side. First successful sync
 * should remove the local data.
 *
 * TODO(Tomek Buszewski): Talk about this when this task is merged
 */
const simulateWriteToPhone = async (time = 2000) => {
  if (failedTrials >= 3) {
    console.error("Cannot write to phone")
    return
  }

  writeTrials = writeTrials + 1

  await new Promise((resolve) => setTimeout(resolve, time))

  if (writeTrials % 3 === 0) {
    console.error("Write failed, retrying")
    failedTrials = failedTrials + 1
    await simulateWriteToPhone(time)
  } else {
    console.log("Write successful")
  }
}

export default {
  state: initialState,
  reducers: {
    addContact(state: Phone, contact: Contact): Phone {
      let currentState = state

      /**
       * This is an example situation when two entities share the same (unique)
       * data, so one has to release it.
       */
      if (Boolean(contact.speedDial)) {
        currentState = revokeField(state, { speedDial: contact.speedDial! })
      }

      return addContacts(currentState, contact)
    },

    editContact(
      state: Phone,
      contactID: ContactID,
      data: BaseContactModel
    ): Phone {
      let currentState = state

      if (Boolean(data.speedDial)) {
        currentState = revokeField(state, { speedDial: data.speedDial! })
      }

      return editContact(currentState, contactID, data)
    },

    removeContact(state: Phone, input: ContactID | ContactID[]): Phone {
      return removeContact(state, input)
    },
  },
  /**
   * All these side effects are just for show, since we don't know anything
   * about phone sync flow at the moment.
   */
  effects: {
    async addContact() {
      await simulateWriteToPhone()
    },

    async editContact() {
      await simulateWriteToPhone()
    },

    async removeContact() {
      await simulateWriteToPhone()
    },
  },
  selectors: (slice: Slicer<StoreData>) => ({
    grouped() {
      return slice((state) => {
        return generateSortedStructure(state)
      })
    },
  }),
}
