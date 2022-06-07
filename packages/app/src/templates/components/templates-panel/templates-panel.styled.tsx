/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import styled, { css } from "styled-components"
import {
  borderColor,
  backgroundColor,
} from "Renderer/styles/theming/theme-getters"

export const PanelWrapper = styled.div`
  border-bottom: solid 0.1rem ${borderColor("list")};
`

export const Panel = styled.div<{
  selectionMode?: boolean
}>`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 1fr;
  align-items: end;
  padding: 2.4rem 3.2rem;
  background-color: ${backgroundColor("main")};
  ${({ selectionMode }) =>
    selectionMode &&
    css`
      grid-template-columns: 62.4rem auto;
      padding-left: 0.6rem;
    `};
  label {
    width: auto;
  }
  button {
    padding: 0 0.8rem;
  }
`

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`
