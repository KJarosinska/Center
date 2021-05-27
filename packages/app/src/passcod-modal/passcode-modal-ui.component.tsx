/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { ModalContent } from "App/collecting-data-modal/collecting-data-modal.styled"
import ModalDialog from "Renderer/components/core/modal-dialog/modal-dialog.component"
import styled from "styled-components"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import { fontWeight } from "Renderer/styles/theming/theme-getters"
import Icon, {
  IconSize,
} from "App/renderer/components/core/icon/icon.component"
import { Type } from "Renderer/components/core/icon/icon.config"
import ButtonComponent from "App/renderer/components/core/button/button.component"
import { DisplayStyle } from "App/renderer/components/core/button/button.config"
import { ipcRenderer } from "electron-better-ipc"
import { HelpActions } from "App/common/enums/help-actions.enum"
import { PasscodeInputs } from "./components/PasscodeInputs.component"

const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 10.6rem;

  span {
    width: 8.1rem;
    height: 5.6rem;
  }
`
export const Title = styled(Text)`
  font-size: 3rem;
  font-weight: ${fontWeight("default")};
`

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  button {
    margin-left: 0.4rem;
    padding: 0.4rem;
    width: auto;
    height: auto;
  }
`
export interface PasscodeModalProps {
  openModal: boolean
  close: () => void
  inputsNumber: number
}

const PasscodeModalUI: FunctionComponent<PasscodeModalProps> = ({
  openModal,
  close,
  inputsNumber,
  ...props
}) => {
  const muditaLogo = (
    <LogoWrapper>
      <Icon
        type={Type.MuditaLogoVertical}
        key={Type.MuditaLogoVertical}
        size={IconSize.Bigger}
      />
    </LogoWrapper>
  )

  const openHelpWindow = () => ipcRenderer.callMain(HelpActions.OpenWindow)

  return (
    <ModalDialog
      {...props}
      open={openModal}
      closeButton={false}
      closeModal={close}
      title={muditaLogo}
    >
      <ModalContent>
        <Title
          displayStyle={TextDisplayStyle.PrimaryHeading}
          message={{
            id: "component.passcodeModalTitle",
          }}
        />
        <PasscodeInputs inputsNumber={inputsNumber} />
        <ButtonContainer>
          <ButtonComponent
            displayStyle={DisplayStyle.Link3}
            labelMessage={{
              id: "component.passcodeModalHelp",
            }}
            onClick={openHelpWindow}
          />
        </ButtonContainer>
      </ModalContent>
    </ModalDialog>
  )
}

export default PasscodeModalUI
