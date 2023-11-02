/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import FilesManager from "App/overview/components/files-manager/files-manager.component"
import styled from "styled-components"
import Text, {
  TextDisplayStyle,
} from "App/__deprecated__/renderer/components/core/text/text.component"
import { action } from "@storybook/addon-actions"
import { MemoryRouter } from "react-router"

const Part = styled.div`
  padding: 2rem;
  > p {
    margin-bottom: 2rem;
  }
`

export default {
  title: "Views|Overview/FilesManager",

  decorators: [
    (story) => (
      <MemoryRouter initialEntries={["/phone"]}>
        <div style={{ maxWidth: "97.5rem" }}>{story()}</div>
      </MemoryRouter>
    ),
  ],
}

export const _FilesManager = () => {
  return (
    <div style={{ maxWidth: "63rem" }}>
      <Part>
        <Text displayStyle={TextDisplayStyle.Label}>No space used</Text>
        <FilesManager
          usedSpace={0}
          onFilesOpen={action("open files manager")}
        />
      </Part>
      <Part>
        <Text displayStyle={TextDisplayStyle.Label}>Custom parameters</Text>
        <FilesManager
          usedSpace={29}
          maxSpace={512}
          onFilesOpen={action("open files manager")}
        />
      </Part>
      <Part>
        <Text displayStyle={TextDisplayStyle.Label}>Half space used</Text>
        <FilesManager
          usedSpace={7.99}
          onFilesOpen={action("open files manager")}
        />
      </Part>
      <Part>
        <Text displayStyle={TextDisplayStyle.Label}>Full space used</Text>
        <FilesManager
          usedSpace={16}
          onFilesOpen={action("open files manager")}
        />
      </Part>
    </div>
  )
}

_FilesManager.story = {
  name: "FilesManager",
}
