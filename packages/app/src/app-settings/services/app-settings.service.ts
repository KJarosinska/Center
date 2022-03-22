/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import Store from "electron-store"
import {
  AppSettings,
  SettingsUpdateOption,
} from "App/main/store/settings.interface"
import settingsSchema from "App/main/store/settings.schema"

export class AppSettingsService {
  constructor(private readonly store: Store<AppSettings>) {}

  getAppSettings(): AppSettings {
    return this.store.store
  }

  resetAppSettings(): AppSettings {
    this.store.reset(...Object.keys(settingsSchema))
    return this.store.store
  }

  updateAppSettings({
    key,
    value,
  }: SettingsUpdateOption): Partial<AppSettings> {
    this.store.set(key, value)
    return this.store.get(key)
  }
}
