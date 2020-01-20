import React from "react"
import { FormattedMessage } from "react-intl"
import InputCheckbox from "Renderer/components/core/input-checkbox/input-checkbox.component"
import { SelectionManagerProps } from "Renderer/components/core/selection-manager/selection-manager.interface"
import Text, {
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import {
  backgroundColor,
  borderColor,
  borderRadius,
} from "Renderer/styles/theming/theme-getters"
import FunctionComponent from "Renderer/types/function-component.interface"
import styled from "styled-components"

const Buttons = styled.div`
  grid-area: Buttons;
  justify-self: end;
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 1.6rem;
  padding-right: 2.4rem;
`

const CheckboxWrapper = styled.div`
  grid-area: Checkbox;
`

const Checkbox = styled(InputCheckbox)``

const Info = styled(Text)`
  grid-area: Info;
  line-height: 1.1;
`

const SelectionManagerWrapper = styled.section<{ expanded?: boolean }>`
  display: grid;
  grid-template-areas: "Checkbox Info Buttons";
  grid-template-columns: auto 1fr auto;
  grid-column-gap: 0.8rem;
  align-items: center;
  height: 4rem;
  padding: 0 0.7rem;
  padding-left: ${({ expanded }) => (expanded ? 1.4 : 0.7)}rem;
  background-color: ${backgroundColor("accent")};
  border-radius: ${borderRadius("medium")};
  border: solid 0.1rem ${borderColor("grey3")};
  box-sizing: border-box;

  ${Checkbox} {
    /* TODO: Remove below style and add a size prop for checkbox */
    transform: scale(${({ expanded }) => (expanded ? 1 : 0.7)});
  }
`

const SelectionManager: FunctionComponent<SelectionManagerProps> = ({
  className,
  selectedItemsNumber,
  allItemsSelected,
  messageId,
  buttons,
  expanded,
  onToggle,
}) => {
  const collectionLabelPluralized = collectionLabelPlural
    ? collectionLabelPlural
    : `${collectionLabel}s`

  const changeHandler = (e: ChangeEvent) => {
    e.preventDefault()
    if (onToggle) {
      onToggle()
    }
  }
  return (
    <SelectionManagerWrapper className={className} expanded={expanded}>
      <CheckboxWrapper>
        <Checkbox
          checked
          indeterminate={!allItemsSelected}
          onChange={changeHandler}
        />
      </CheckboxWrapper>
      <Info
        displayStyle={TextDisplayStyle.MediumFadedLightText}
        data-testid="info"
      >
        <FormattedMessage
          id={messageId}
          values={{ num: allItemsSelected ? -1 : selectedItemsNumber }}
        />
      </Info>
      {Boolean(buttons?.length) && (
        <Buttons data-testid="buttons">
          {buttons?.map(button => button)}
        </Buttons>
      )}
    </SelectionManagerWrapper>
  )
}

export default SelectionManager
