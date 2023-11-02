/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import StoryContainer from "App/__deprecated__/renderer/components/storybook/story-container.component"
import Story from "../../storybook/story.component"
import { css } from "styled-components"
import {
  List,
  ListItem,
  RenderListItem,
  renderListItemSearchable,
} from "App/__deprecated__/renderer/components/core/list/list.component"
import SearchableText from "App/__deprecated__/renderer/components/core/searchable-text/searchable-text.component"

const storyContainerStyles = css`
  main > * {
    width: 20rem;
  }
`

export const basicItems = [
  "apple",
  "banana",
  "orange",
  "pineapple",
  "strawberry",
  "potato",
  "tomato",
  "cabbage",
]

export const advancedItems = [
  { name: "Apple", value: "apple", type: "fruit", icon: "🍏" },
  { name: "Banana", value: "banana", type: "fruit", icon: "🍌" },
  { name: "Orange", value: "orange", type: "fruit", icon: "🍊" },
  { name: "Pineapple", value: "pineapple", type: "fruit", icon: "🍍" },
  { name: "Strawberry", value: "strawberry", type: "fruit", icon: "🍓" },
  { name: "Potato", value: "potato", type: "vegetable", icon: "🥔" },
  { name: "Tomato", value: "tomato", type: "vegetable", icon: "🍅" },
  { name: "Cabbage", value: "cabbage", type: "vegetable", icon: "🥬" },
]

export type AdvancedItem = (typeof advancedItems)[number]

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getItemName = (item: AdvancedItem) => item.name
// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const isItemMatching = (item: AdvancedItem, search: string) => {
  return item.name.toLowerCase().includes(search.toLowerCase())
}

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const renderCustomListItem: RenderListItem<AdvancedItem, any> = ({
  item: { name, type, icon },
  searchString,
  props,
}) => (
  <ListItem {...props}>
    <strong>
      {icon} <SearchableText text={name} search={searchString} />
    </strong>
    <br />
    <em>{type}</em>
  </ListItem>
)

const props = undefined
const searchString = ""

export default {
  title: "Components|Core/List",

  excludeStories: [
    "basicItems",
    "advancedItems",
    "AdvancedItem",
    "getItemName",
    "isItemMatching",
    "renderCustomListItem",
  ],
}

export const Default = () => (
  <>
    <StoryContainer title="Default" customStyle={storyContainerStyles}>
      <Story title="Default">
        <List expanded>
          {basicItems.map((item) =>
            renderListItemSearchable({
              item,
              props,
              searchString,
            })
          )}
        </List>
      </Story>
    </StoryContainer>
    <StoryContainer title="Customizations" customStyle={storyContainerStyles}>
      <Story title="Default">
        <List expanded>
          {advancedItems.map((item) =>
            renderCustomListItem({
              item,
              props,
              searchString,
            })
          )}
        </List>
      </Story>
    </StoryContainer>
  </>
)
