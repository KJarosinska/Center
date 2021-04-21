/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { SystemProps } from "Renderer/components/rest/overview/system/system.interface"
import Card, {
  CardAction,
  CardActionButton,
  CardText,
} from "Renderer/components/rest/overview/card.elements"
import styled from "styled-components"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import { FormattedMessage } from "react-intl"
import { intl } from "Renderer/utils/intl"
import {
  fontWeight,
  letterSpacing,
  textColor,
} from "Renderer/styles/theming/theme-getters"
import { noop } from "Renderer/utils/noop"
import { Type } from "Renderer/components/core/icon/icon.config"
import { SystemTestIds } from "Renderer/components/rest/overview/system/system-test-ids"
import { OverviewTestIds } from "Renderer/modules/overview/overview-test-ids.enum"

const TextInfo = styled(CardText)``

const Version = styled.div`
  display: flex;
  align-items: baseline;

  span {
    margin-left: 0.8rem;
    font-weight: ${fontWeight("light")};
    text-transform: none;
  }
`

const LastUpdate = styled(Text)`
  margin-top: 1.2rem;
  letter-spacing: ${letterSpacing("small")}rem;
  color: ${textColor("secondary")};
`

const AvailableUpdate = styled(Text)`
  margin-top: 1.6rem;
  text-transform: none;
  letter-spacing: ${letterSpacing("small")}rem;
`

const System: FunctionComponent<SystemProps> = ({
  className,
  osVersion,
  lastUpdate,
  updateAvailable,
  updateDownloaded,
  onUpdateCheck = noop,
  onUpdate = noop,
  onDownload = noop,
}) => {
  return (
    <Card className={className}>
      <TextInfo>
        <Version>
          <Text
            displayStyle={TextDisplayStyle.SecondaryBoldHeading}
            data-testid={OverviewTestIds.OsVersion}
          >
            {osVersion}
          </Text>
          <Text element={"span"} displayStyle={TextDisplayStyle.SmallText}>
            <FormattedMessage id="module.overview.systemVersion" />
          </Text>
        </Version>
        {Boolean(lastUpdate) && (
          <LastUpdate displayStyle={TextDisplayStyle.SmallFadedText}>
            <FormattedMessage
              id="module.overview.systemLastUpdate"
              values={{
                date: new Date(lastUpdate).toLocaleDateString("en-US"),
              }}
            />
          </LastUpdate>
        )}
        {updateAvailable && (
          <AvailableUpdate displayStyle={TextDisplayStyle.SmallText}>
            {updateDownloaded ? (
              <FormattedMessage id="module.overview.systemUpdateDownloaded" />
            ) : (
              <FormattedMessage id="module.overview.systemUpdateAvailable" />
            )}
          </AvailableUpdate>
        )}
      </TextInfo>
      <CardAction filled>
        {updateAvailable ? (
          updateDownloaded ? (
            <CardActionButton
              active
              label={intl.formatMessage({
                id: "module.overview.systemUpdateAction",
              })}
              Icon={Type.Reload}
              onClick={onUpdate}
            />
          ) : (
            <CardActionButton
              active
              label={intl.formatMessage({
                id: "module.overview.systemDownloadAction",
              })}
              Icon={Type.DownloadWhite}
              onClick={onDownload}
              data-testid={SystemTestIds.DownloadButton}
            />
          )
        ) : (
          <CardActionButton
            active
            label={intl.formatMessage({
              id: "module.overview.systemCheckForUpdates",
            })}
            Icon={Type.Reload}
            onClick={onUpdateCheck}
          />
        )}
      </CardAction>
    </Card>
  )
}

export default System