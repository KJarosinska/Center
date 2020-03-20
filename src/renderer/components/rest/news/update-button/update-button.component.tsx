import * as React from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import Button, {
  Props as ButtonProps,
} from "Renderer/components/core/button/button.component"
import { DisplayStyle } from "Renderer/components/core/button/button.config"
import styled, { css } from "styled-components"
import { Type } from "Renderer/components/core/icon/icon.config"
import {
  transitionTime,
  transitionTimingFunction,
} from "Renderer/styles/theming/theme-getters"
import { noop } from "Renderer/utils/noop"

const rotateAnimation = css`
  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  animation: rotate ${transitionTime("slow")} infinite
    ${transitionTimingFunction("easeInOut")};
`
const UpdateButton = styled(Button)<{ isUpadating?: boolean }>`
  display: flex;
  width: auto;
  svg {
    ${({ isUpadating }) => isUpadating && rotateAnimation}
  }
`

interface UpdateButtonProps {
  onUpdating: () => void
  updated?: boolean
  label?: string
}

const UpdateButtonComponent: FunctionComponent<UpdateButtonProps &
  ButtonProps> = ({ onUpdating = noop, updated = false, label = "Update" }) => {
  return (
    <UpdateButton
      displayStyle={DisplayStyle.Link2}
      label={label}
      target="_blank"
      Icon={Type.Refresh}
      onClick={onUpdating}
      isUpadating={updated}
      disabled={updated}
    />
  )
}

export default UpdateButtonComponent
