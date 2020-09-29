import React, { Dispatch, SetStateAction } from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { TetheringTestIds } from "Renderer/modules/tethering/screens/tethering.enum"
import {
  EnabledButtonWrapper,
  StyledButton,
  TetheringToggler,
  TextWrapper,
} from "Renderer/modules/tethering/screens/tethering.styled"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import { intl, textFormatters } from "Renderer/utils/intl"
import { tetheringMessages } from "Renderer/modules/tethering/tethering-messages"
import { URL_MAIN } from "Renderer/constants/urls"
import StatBoxes from "Renderer/components/rest/tethering/stat-boxes.component"

interface TetheringEnabledProps {
  tetheringEnabled?: boolean
  onToggleTethering?: Dispatch<SetStateAction<boolean>>
}

const TetheringEnabled: FunctionComponent<TetheringEnabledProps> = ({
  onToggleTethering,
  tetheringEnabled,
}) => (
  <div data-testid={TetheringTestIds.EnabledWrapper}>
    <TextWrapper>
      <Text displayStyle={TextDisplayStyle.MediumText}>
        {intl.formatMessage(tetheringMessages.usbTethering, textFormatters)}
      </Text>
      <TetheringToggler
        toggleValue={tetheringEnabled}
        onToggle={onToggleTethering}
      />
    </TextWrapper>
    <EnabledButtonWrapper>
      <Text
        displayStyle={TextDisplayStyle.MediumFadedLightText}
        data-testid={TetheringTestIds.StartTetheringNotification}
      >
        {intl.formatMessage(tetheringMessages.enablingInfo, textFormatters)}
      </Text>
      <StyledButton
        data-testid={TetheringTestIds.GoToButton}
        label={intl.formatMessage(tetheringMessages.openConnectionSettings)}
        to={URL_MAIN.settings}
      />
    </EnabledButtonWrapper>
    <StatBoxes
      timeActive={"15:03"}
      dataReceived={23943294}
      dataSent={92349324}
    />
  </div>
)

export default TetheringEnabled
