/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import StoryContainer from "App/__deprecated__/renderer/components/storybook/story-container.component"
import Story from "../../storybook/story.component"
import { css } from "styled-components"
import SearchableText from "App/__deprecated__/renderer/components/core/searchable-text/searchable-text.component"

const storyContainerStyles = css`
  main > * {
    width: 20rem;
  }
`

const text = "Searchable Text"
const search = text.substr(0, 3)

export default {
  title: "Components|Core/Searchable Text",
}

export const Default = () => (
  <>
    <StoryContainer title="Default" customStyle={storyContainerStyles}>
      <Story title="With no search">
        <span>
          <SearchableText text={text} />
        </span>
      </Story>
      <Story title="With search">
        <span>
          <SearchableText text={text} search={search} />
        </span>
      </Story>
    </StoryContainer>
  </>
)
