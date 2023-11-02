/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useState } from "react"
import { defineMessages } from "react-intl"
import ButtonToggler, {
  ButtonTogglerItem,
} from "App/__deprecated__/renderer/components/core/button-toggler/button-toggler.component"
import StoryContainer from "App/__deprecated__/renderer/components/storybook/story-container.component"
import Story from "App/__deprecated__/renderer/components/storybook/story.component"

const messages = defineMessages({
  tooltipTitle: { id: "module.overview.networkTooltipTitle" },
  tooltipDescription: { id: "module.overview.networkTooltipDescription" },
  battery: { id: "module.overview.phoneBattery" },
  noConnection: { id: "module.overview.phoneNoConnection" },
  network: { id: "module.overview.networkName" },
})

export default {
  title: "Components|Core/Button Toggler",
}

export const Default = () => (
  <>
    <StoryContainer title="Types" column>
      <Story title="Single button">
        <ButtonToggler>
          <ButtonTogglerItem label="Turn on" />
        </ButtonToggler>
      </Story>
      <Story title="Disabled">
        <ButtonToggler>
          <ButtonTogglerItem label="Turn on" disabled />
        </ButtonToggler>
      </Story>
      <Story title="Disabled with loading">
        <ButtonToggler>
          <ButtonTogglerItem label="Turn on" disabled loading />
        </ButtonToggler>
      </Story>
      <Story title="Two buttons">
        <ButtonToggler>
          <ButtonTogglerItem label="Yes" active />
          <ButtonTogglerItem label="No" />
        </ButtonToggler>
      </Story>
      <Story title="Three buttons">
        <ButtonToggler>
          <ButtonTogglerItem label="Weekly" />
          <ButtonTogglerItem label="Monthly" active />
          <ButtonTogglerItem label="Yearly" />
        </ButtonToggler>
      </Story>
      <Story title="Four buttons">
        <ButtonToggler>
          <ButtonTogglerItem label="Daily" />
          <ButtonTogglerItem label="Weekly" active />
          <ButtonTogglerItem label="Monthly" />
          <ButtonTogglerItem label="Yearly" />
        </ButtonToggler>
      </Story>
    </StoryContainer>
    <StoryContainer title="Themes">
      <Story title="Default">
        <ButtonToggler>
          <ButtonTogglerItem label="Yes" active />
          <ButtonTogglerItem label="No" />
        </ButtonToggler>
      </Story>
      <Story title="Filled">
        <ButtonToggler filled>
          <ButtonTogglerItem label="Yes" active />
          <ButtonTogglerItem label="No" />
        </ButtonToggler>
      </Story>
    </StoryContainer>
  </>
)

export const InteractiveSingleButton = () => {
  const [enabled, setEnabledState] = useState(false)

  const toggleEnabledState = () => setEnabledState((prevState) => !prevState)
  return (
    <>
      <Story title="Default theme">
        <ButtonToggler>
          <ButtonTogglerItem
            label="Enable"
            onClick={toggleEnabledState}
            active={enabled}
          />
        </ButtonToggler>
      </Story>
      <Story title="Filled theme">
        <ButtonToggler filled>
          <ButtonTogglerItem
            label="Enable"
            onClick={toggleEnabledState}
            active={enabled}
          />
        </ButtonToggler>
      </Story>
    </>
  )
}

InteractiveSingleButton.story = {
  name: "Interactive - single button",
}

export const InteractiveMultipleButtons = () => {
  const threeStates = ["Weekly", "Monthly", "Yearly"]
  const [activeLabel, setActiveLabel] = useState(threeStates[0])

  return (
    <>
      <Story title="Default theme">
        <ButtonToggler>
          {threeStates.map((label, index) => {
            const selectState = () => setActiveLabel(label)
            return (
              <ButtonTogglerItem
                label={label}
                onClick={selectState}
                active={label === activeLabel}
                key={index}
              />
            )
          })}
        </ButtonToggler>
      </Story>
      <Story title="Filled theme">
        <ButtonToggler filled>
          {threeStates.map((label, index) => {
            const selectState = () => setActiveLabel(label)
            return (
              <ButtonTogglerItem
                label={label}
                onClick={selectState}
                active={label === activeLabel}
                key={index}
              />
            )
          })}
        </ButtonToggler>
      </Story>
    </>
  )
}

InteractiveMultipleButtons.story = {
  name: "Interactive - multiple buttons",
}

export const WithTooltip = () => {
  const props = {
    tooltipTitle: messages.tooltipTitle,
    tooltipDescription: messages.tooltipDescription,
  }
  return (
    <>
      <Story title="Single button">
        <ButtonToggler {...props}>
          <ButtonTogglerItem label="Turn on" />
        </ButtonToggler>
      </Story>
      <Story title="Two buttons">
        <ButtonToggler {...props}>
          <ButtonTogglerItem label="Yes" active />
          <ButtonTogglerItem label="No" />
        </ButtonToggler>
      </Story>
      <Story title="Three buttons">
        <ButtonToggler {...props}>
          <ButtonTogglerItem label="Weekly" />
          <ButtonTogglerItem label="Monthly" active />
          <ButtonTogglerItem label="Yearly" />
        </ButtonToggler>
      </Story>
      <Story title="Four buttons">
        <ButtonToggler {...props}>
          <ButtonTogglerItem label="Daily" />
          <ButtonTogglerItem label="Weekly" active />
          <ButtonTogglerItem label="Monthly" />
          <ButtonTogglerItem label="Yearly" />
        </ButtonToggler>
      </Story>
    </>
  )
}

WithTooltip.story = {
  name: "With tooltip",
}
