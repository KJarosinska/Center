/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import { OnboardingTroubleshootingProps } from "Renderer/components/rest/onboarding/onboarding.interface"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import ButtonComponent from "Renderer/components/core/button/button.component"
import {
  DisplayStyle,
  Type as ButtonType,
} from "Renderer/components/core/button/button.config"
import { intl, textFormatters } from "Renderer/utils/intl"
import { noop } from "Renderer/utils/noop"
import {
  OnboardingWrapper,
  Title,
} from "Renderer/components/rest/onboarding/onboarding.elements"
import styled from "styled-components"
import {
  backgroundColor,
  fontWeight,
} from "Renderer/styles/theming/theme-getters"

const Steps = styled.ol`
  min-width: 59rem;
  text-align: left;
  list-style: none;
  counter-reset: custom-counter;

  > li {
    display: flex;
    flex-direction: row;
    align-items: center;
    counter-increment: custom-counter;

    &::before {
      content: counter(custom-counter);
      width: 3.2rem;
      height: 3.2rem;
      margin-right: 3.2rem;
      display: flex;
      border-radius: 50%;
      align-items: center;
      justify-content: center;
      background-color: ${backgroundColor("icon")};
      box-shadow: 0 0.5rem 1rem 0 #00000019;
    }

    + ul {
      padding-left: 3.2rem;
      margin-left: 3.2rem;
      list-style-type: disc;

      li {
        margin-left: 1.6rem;
        padding-left: 0;
        margin-top: 0.8rem;
        line-height: 2.4rem;
      }
    }

    &:not(:first-of-type) {
      margin-top: 3.2rem;
    }
  }
`

const Support = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-weight: ${fontWeight("light")};

  button {
    margin-left: 0.4rem;
    padding: 0.4rem;
    width: auto;
    height: auto;
  }
`

const OnboardingTroubleshooting: FunctionComponent<OnboardingTroubleshootingProps> = ({
  onRetry = noop,
  onContact = noop,
}) => {
  return (
    <OnboardingWrapper>
      <header>
        <Title
          displayStyle={TextDisplayStyle.PrimaryHeading}
          message={{
            id: "module.onboarding.troubleshootingTitle",
            values: textFormatters,
          }}
        />
        <Text
          displayStyle={TextDisplayStyle.LargeFadedText}
          message={{ id: "module.onboarding.troubleshootingInstruction" }}
        />
      </header>
      <main>
        <Steps>
          <Text
            element={"li"}
            displayStyle={TextDisplayStyle.LargeText}
            message={{ id: "module.onboarding.troubleshootingSteps1" }}
          />
          <Text
            element={"li"}
            displayStyle={TextDisplayStyle.LargeText}
            message={{ id: "module.onboarding.troubleshootingSteps2" }}
          />
          <Text
            element={"li"}
            displayStyle={TextDisplayStyle.LargeText}
            message={{ id: "module.onboarding.troubleshootingSteps3" }}
          />
          <Text
            element={"li"}
            displayStyle={TextDisplayStyle.LargeText}
            message={{ id: "module.onboarding.troubleshootingSteps4" }}
          />
          <ul>
            <Text
              element={"li"}
              displayStyle={TextDisplayStyle.MediumFadedText}
              message={{ id: "module.onboarding.troubleshootingSteps4a" }}
            />
            <Text
              element={"li"}
              displayStyle={TextDisplayStyle.MediumFadedText}
              message={{ id: "module.onboarding.troubleshootingSteps4b" }}
            />
          </ul>
          <Text
            element={"li"}
            displayStyle={TextDisplayStyle.LargeText}
            message={{ id: "module.onboarding.troubleshootingSteps5" }}
          />
        </Steps>
      </main>
      <footer>
        <ButtonComponent
          type={ButtonType.Button}
          label={intl.formatMessage({
            id: "module.onboarding.troubleshootingButton",
          })}
          onClick={onRetry}
          data-testid="retry"
        />
        <Support>
          <Text
            displayStyle={TextDisplayStyle.SmallFadedText}
            message={{
              id: "module.onboarding.troubleshootingSupportMessage",
            }}
          />
          <ButtonComponent
            displayStyle={DisplayStyle.Link3}
            labelMessage={{
              id: "module.onboarding.supportButton",
            }}
            onClick={onContact}
            data-testid="contact-support"
          />
        </Support>
      </footer>
    </OnboardingWrapper>
  )
}

export default OnboardingTroubleshooting