/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  init,
  RematchDispatch,
  RematchRootState,
  InitConfig,
} from "@rematch/core"
import selectPlugin from "@rematch/select"
import { models, RootModel } from "Renderer/models/models"
import { filesManagerSeed } from "App/seeds/filesManager"
import { templatesSeed } from "App/seeds/templates"
import { helpSeed } from "App/seeds/help"
import { notesSeed } from "App/seeds/notes"

const config: InitConfig<RootModel> = {
  models,
  plugins: [selectPlugin()],
}

if (process.env.NODE_ENV !== "test") {
  config.redux = {
    initialState: {
      filesManager: filesManagerSeed,
      templates: templatesSeed,
      help: helpSeed,
      notes: notesSeed,
    },
  }
}

const store = init(config)

export const { select } = store
export type RootState = RematchRootState<typeof models>
export type Store = typeof store
export type Dispatch = RematchDispatch<RootModel>

export default store