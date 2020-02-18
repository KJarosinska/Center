import FunctionComponent from "Renderer/types/function-component.interface"
import * as React from "react"
import { DisplayStyle } from "Renderer/components/core/button/button.config"
import CloseIcon from "Renderer/svg/close.svg"
import modalService from "Renderer/components/core/modal/modal.service"
import styled, { css } from "styled-components"
import Button from "Renderer/components/core/button/button.component"
import { noop } from "Renderer/utils/noop"
import Text from "Renderer/components/core/text/text.component"
import {
  getButtonsPosition,
  getHeaderTemplate,
  getModalButtonsSize,
  getModalSize,
  getSubtitleStyle,
  getTitleStyle,
} from "Renderer/components/core/modal/modal.helpers"

export enum ModalSize {
  VerySmall,
  Small,
  Medium,
  Large,
}

export enum TitleOrder {
  TitleFirst,
  SubtitleFirst,
}

const ModalFrame = styled.div<{ size: ModalSize }>`
  ${({ size }) => getModalSize(size)};
`

const Header = styled.div<{ titleOrder: TitleOrder }>`
  display: grid;
  grid-template-columns: 1fr 5rem;
  grid-row-gap: 1rem;
  ${({ titleOrder }) => getHeaderTemplate(titleOrder)};
`

const ModalTitle = styled(Text)<{ subTitle?: string }>`
  grid-area: Title;
`

const ModalSubTitle = styled(Text)`
  grid-area: Subtitle;
`

const Close = styled(Button)`
  margin-top: -0.5rem;
  grid-area: Close;
  justify-self: end;
`

const ButtonContainer = styled.div<{ buttonsPosition: ModalSize }>`
  display: flex;
  ${({ buttonsPosition }) => getButtonsPosition(buttonsPosition)};
`

const ButtonWrapper = styled.div`
  display: flex;
`

const CloseButton = styled(Button)<{ actionButton?: string }>`
  ${({ actionButton }) =>
    actionButton &&
    css`
      margin-right: 1.5rem;
    `};
`

interface Props {
  actionButtonLabel?: string
  onActionButtonClick?: () => void
  closeable?: boolean
  closeButton?: boolean
  onClose?: () => void
  size: ModalSize
  subtitle?: string
  title?: string
  titleOrder?: TitleOrder
}

const Modal: FunctionComponent<Props> = ({
  actionButtonLabel,
  onActionButtonClick = noop,
  children,
  closeable = true,
  closeButton = true,
  onClose = noop,
  size = ModalSize.Large,
  subtitle,
  title,
  titleOrder = TitleOrder.TitleFirst,
}) => {
  const closeModal = () => {
    modalService.allowClosingModal()
    modalService.closeModal()
    onClose()
  }
  return (
    <ModalFrame size={size}>
      <Header titleOrder={titleOrder}>
        <ModalTitle
          displayStyle={getTitleStyle(size)}
          subTitle={subtitle}
          element={"h2"}
        >
          {title}
        </ModalTitle>
        {closeable && (
          <Close
            displayStyle={DisplayStyle.IconOnly2}
            onClick={closeModal}
            Icon={CloseIcon}
          />
        )}
        <ModalSubTitle displayStyle={getSubtitleStyle(size)} element={"p"}>
          {subtitle}
        </ModalSubTitle>
      </Header>
      {children}
      <ButtonContainer buttonsPosition={size}>
        <ButtonWrapper>
          {closeButton && (
            <CloseButton
              actionButton={actionButtonLabel}
              displayStyle={DisplayStyle.Secondary}
              size={getModalButtonsSize(size)}
              label="Close"
              onClick={closeModal}
              data-testid={"modal-action-button"}
            />
          )}
          {actionButtonLabel && (
            <Button
              displayStyle={DisplayStyle.Primary}
              size={getModalButtonsSize(size)}
              label={actionButtonLabel}
              onClick={onActionButtonClick}
              data-testid={"modal-action-button"}
            />
          )}
        </ButtonWrapper>
      </ButtonContainer>
    </ModalFrame>
  )
}

export default Modal
