import React from "react"
import FunctionComponent from "Renderer/types/function-component.interface"
import { NetworkProps } from "Renderer/components/rest/overview/network/network.interface"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import { FormattedMessage } from "react-intl"
import styled from "styled-components"
import { intl } from "Renderer/utils/intl"
import SimInfo from "Common/interfaces/sim-info.interface"
import { letterSpacing, textColor } from "Renderer/styles/theming/theme-getters"
import Card, {
  CardAction,
  CardActionButton,
  CardText,
} from "Renderer/components/rest/overview/card.elements"
import { noop } from "Renderer/utils/noop"

const TextInfo = styled(CardText)`
  p {
    margin-top: 1.2rem;
    letter-spacing: ${letterSpacing("small")}rem;
    color: ${textColor("placeholder")};
  }
`

const SimButton: FunctionComponent<SimInfo & { onClick: () => void }> = ({
  slot,
  number: phone,
  active,
  onClick,
}) => {
  const label = intl.formatMessage(
    {
      id: "view.name.overview.network.simInfo",
    },
    { slot, phone }
  )
  return <CardActionButton label={label} active={active} onClick={onClick} />
}

const NoSimButton = () => {
  const label = intl.formatMessage({
    id: "view.name.overview.network.noSimInserted",
  })

  return <CardActionButton label={label} disabled />
}

const Network: FunctionComponent<NetworkProps> = ({
  className,
  simCards = [],
  onSimChange = noop,
}) => {
  const noActiveCard = simCards.every(({ active }) => !active)
  const activatingAvailable =
    (simCards.length && noActiveCard) || simCards.length > 1
  return (
    <Card className={className}>
      <TextInfo>
        <Text displayStyle={TextDisplayStyle.SecondaryBoldHeading}>
          <FormattedMessage id="view.name.overview.network.name" />
        </Text>
        {activatingAvailable && (
          <Text displayStyle={TextDisplayStyle.SmallFadedText}>
            <FormattedMessage id="view.name.overview.network.description" />
          </Text>
        )}
      </TextInfo>
      <CardAction>
        {Boolean(simCards.length) ? (
          simCards.map(simCard => {
            const onClick = () => onSimChange(simCard)
            return (
              <SimButton key={simCard.number} {...simCard} onClick={onClick} />
            )
          })
        ) : (
          <NoSimButton />
        )}
      </CardAction>
    </Card>
  )
}

export default Network
