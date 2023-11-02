/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { action } from "@storybook/addon-actions"
import styled from "styled-components"
import ConnectingContent from "App/connecting/components/connecting-content.component"

const Wrapper = styled.div`
  height: 100vh;
  display: grid;
  align-items: stretch;
  justify-items: stretch;
`

export default {
  title: "Components/Connecting",
}

export const Connecting = () => {
  return (
    <Wrapper>
      <ConnectingContent longerConnection={false} onCancel={action("Cancel")} />
    </Wrapper>
  )
}

export const LongerConnecting = () => {
  return (
    <Wrapper>
      <ConnectingContent longerConnection onCancel={action("Cancel")} />
    </Wrapper>
  )
}
