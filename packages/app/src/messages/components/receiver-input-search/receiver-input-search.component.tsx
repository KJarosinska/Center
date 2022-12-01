/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentProps } from "react"
import styled, { css } from "styled-components"
import { defineMessages } from "react-intl"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import { intl } from "App/__deprecated__/renderer/utils/intl"
import InputSearch from "App/__deprecated__/renderer/components/core/input-search/input-search.component"
import { searchIcon } from "App/__deprecated__/renderer/components/core/input-text/input-text.elements"
import { Receiver } from "App/messages/reducers/messages.interface"
import { createFullName } from "App/contacts/helpers/contacts.helpers"
import { renderListItem } from "App/messages/components/receiver-input-search/receiver-input-search.helpers"
import { ReceiverInputSelectTestIds } from "App/messages/components/receiver-input-search/receiver-input-search-test-ids.enum"

import { ItemType } from "App/__deprecated__/renderer/components/core/input-search/input-search.component"

const messages = defineMessages({
  searchPlaceholder: { id: "module.contacts.panelSearchPlaceholder" },
})

const ReceiverInputSelectListStyles = css`
  max-height: 40rem;
`

const ReceiverInputSelect = styled(InputSearch)`
  width: 28rem;
`

type InputSearchProps = Omit<
  ComponentProps<typeof InputSearch>,
  "results" | "items" | "type"
>

interface Props extends InputSearchProps {
  results: Receiver[]
  searchValue: string
  showSearchResults?: boolean
  onReceiverSelect: (receiver: Receiver) => void
}

const ReceiverInputSearch: FunctionComponent<Props> = ({
  results,
  showSearchResults = false,
  minCharsToShowResults = 1,
  onReceiverSelect,
  ...props
}) => {
  const handleSelect = (receiver: Receiver) => {
    if (!receiver) {
      return
    }

    onReceiverSelect(receiver)
  }

  return (
    <ReceiverInputSelect
      type="search"
      data-testid={ReceiverInputSelectTestIds.Input}
      outlined
      searchable
      items={[
        ...results.map((contact) => ({
          type: ItemType.Data,
          data: contact,
        })),
      ]}
      leadingIcons={[searchIcon]}
      label={intl.formatMessage(messages.searchPlaceholder)}
      onSelect={handleSelect}
      renderItemValue={createFullName}
      renderListItem={renderListItem}
      listStyles={ReceiverInputSelectListStyles}
      minCharsToShowResults={minCharsToShowResults}
      itemListDisabled={showSearchResults}
      {...props}
    />
  )
}

export default ReceiverInputSearch
