import * as React from "react"
import {
  getEnumName,
  getIconType,
  Type,
} from "Renderer/components/core/icon/icon.config"
import Svg from "Renderer/components/core/svg/svg.component"
import { backgroundColor } from "Renderer/styles/theming/theme-getters"
import FunctionComponent from "Renderer/types/function-component.interface"
import styled, { css } from "styled-components"

export interface Props {
  badge?: boolean
  height?: number
  width?: number
  type?: Type
}

const badgeStyles = css`
  &:after {
    display: block;
    content: "";
    position: absolute;
    top: -0.2rem;
    right: -0.3rem;
    height: 0.8rem;
    width: 0.8rem;
    border-radius: 50%;
    background-color: ${backgroundColor("blue")};
  }
`

const Wrapper = styled.div<{
  badge?: boolean
  height?: number
  width?: number
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${({ height = 2 }) => height + "rem"};
  width: ${({ width = 2 }) => width + "rem"};
  position: relative;

  svg {
    max-height: 100%;
    max-width: 100%;
  }

  ${({ badge }) => badge && badgeStyles};
`

const Icon: FunctionComponent<Props> = ({
  badge = false,
  className,
  height,
  width,
  type,
}) => {
  return (
    <Wrapper
      badge={badge}
      data-testid={`icon-${getEnumName(type)}`}
      className={className}
      height={height || width}
      width={width || height}
    >
      <Svg Image={getIconType(type)} />
    </Wrapper>
  )
}

export default Icon
