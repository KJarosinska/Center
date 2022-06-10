/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import styled, { css } from "styled-components"
import BaseTable, {
  Col,
  EmptyState,
  Row as BaseRow,
} from "Renderer/components/core/table/table.component"
import { transitionTime } from "Renderer/styles/theming/theme-getters"
import { VisibleCheckbox } from "Renderer/components/rest/visible-checkbox/visible-checkbox"
import {
  animatedOpacityActiveStyles,
  animatedOpacityStyles,
} from "Renderer/components/rest/animated-opacity/animated-opacity"
import Icon from "Renderer/components/core/icon/icon.component"
import { backgroundColor } from "Renderer/styles/theming/theme-getters"
import Text from "Renderer/components/core/text/text.component"

const checkboxShowedStyles = css`
  margin-left: 1rem;
  display: block;
`

export const Checkbox = styled(VisibleCheckbox)<{ visible?: boolean }>`
  ${({ visible }) => (visible ? checkboxShowedStyles : "display: none;")};
`

export const DeleteCol = styled(Col)`
  opacity: 0;
  transition: opacity ${transitionTime("veryQuick")};
`

export const Table = styled(BaseTable)`
  --columnsGap: 0;
  --columnsTemplate: 3.2rem 5.6rem 1fr 7rem;
  --columnsTemplateWithOpenedSidebar: 4rem 27.5rem;
`
export const IconWrapper = styled.div`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background-color: ${backgroundColor("minor")};
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Row = styled(BaseRow)`
  &:hover {
    ${Checkbox} {
      ${animatedOpacityActiveStyles};
      ${checkboxShowedStyles};
    }

    ${DeleteCol} {
      opacity: 0.5;
    }

    ${IconWrapper} {
      display: none;
      ${animatedOpacityStyles}
    }
  }
`

export const TemplatesEmptyState = styled(EmptyState)`
  border-top: none;
`

export const TemplateIcon = styled(Icon)`
  margin-right: 0;
  margin-left: 0;
`

export const TemplateText = styled(Text)`
  width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`
