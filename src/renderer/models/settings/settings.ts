import { Dispatch } from "Renderer/store"
import { getAppSettings } from "Renderer/requests/app-settings.request"
import { Store } from "Renderer/models/settings/settings.interface"
import updateSettingsRequest from "Renderer/requests/update-settings.request"
import { Option } from "Renderer/components/rest/settings/settings-toggler.component"

export default {
  state: {},
  reducers: {
    update(state: Store, payload: { [key in Option]?: boolean }) {
      return { ...state, ...payload }
    },
  },
  effects: (dispatch: Dispatch) => ({
    async loadSettings() {
      dispatch.settings.update(await getAppSettings())
    },
    async setAutostart(option: boolean) {
      const propertyToUpdate = { [Option.Autostart]: option }
      await updateSettingsRequest(propertyToUpdate)
      dispatch.settings.update(propertyToUpdate)
    },
    async setTethering(option: boolean) {
      const propertyToUpdate = { [Option.Tethering]: option }
      await updateSettingsRequest(propertyToUpdate)
      dispatch.settings.update(propertyToUpdate)
    },
    async setIncomingCalls(option: Record<Option.IncomingCalls, boolean>) {
      await updateSettingsRequest(option)
      dispatch.settings.update(option)
    },
    async setIncomingMessages(
      option: Record<Option.IncomingMessages, boolean>
    ) {
      await updateSettingsRequest(option)
      dispatch.settings.update(option)
    },
    async setLowBattery(option: Record<Option.LowBattery, boolean>) {
      await updateSettingsRequest(option)
      dispatch.settings.update(option)
    },
  }),
}
