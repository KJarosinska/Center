import "@testing-library/jest-dom/extend-expect"
import React from "react"
import InputSelect, {
  InputSelectProps,
} from "Renderer/components/core/input-select/input-select.component"
import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
import { fireEvent } from "@testing-library/dom"
import { basicItems } from "Renderer/components/core/list/list.stories"

const renderInputSelect = ({ ...props }: Partial<InputSelectProps> = {}) => {
  const outcome = renderWithThemeAndIntl(
    <InputSelect items={basicItems} {...props} />
  )
  return {
    ...outcome,
    input: outcome.getByRole("textbox"),
    icon: outcome.getByTestId("actionIcon"),
    list: outcome.container.querySelector("ul"),
    listItems: outcome.container.querySelectorAll("ul li"),
  }
}

test("select input focus/blur toggles the list", () => {
  const { list, input } = renderInputSelect()
  expect(list).not.toBeVisible()
  fireEvent.focus(input)
  expect(list).toBeVisible()
  fireEvent.blur(input)
  expect(list).not.toBeVisible()
})

test("select input arrow click toggles the list", () => {
  const { list, icon } = renderInputSelect()
  expect(list).not.toBeVisible()
  fireEvent.click(icon)
  expect(list).toBeVisible()
  fireEvent.click(icon)
  expect(list).not.toBeVisible()
})

test("select input returns selected list item", () => {
  const onSelect = jest.fn()
  const { listItems } = renderInputSelect({ onSelect })
  fireEvent.click(listItems[2])
  expect(onSelect).toBeCalledWith(basicItems[2])
})

test("select input resets after selecting empty option", () => {
  const onSelect = jest.fn()
  const { listItems } = renderInputSelect({
    onSelect,
    emptyItemValue: "empty",
  })
  expect(listItems[0]).toHaveTextContent("empty")
  fireEvent.click(listItems[0])
  expect(onSelect).toBeCalledWith("")
})

test("Item marked as disabled in `disabledOptions` list should have a `disabled` attribute", () => {
  const { listItems } = renderInputSelect({
    disabledItems: [basicItems[0]],
  })
  expect(listItems[0]).toHaveStyleRule("cursor", "not-allowed")
  expect(listItems[1]).not.toHaveStyleRule("cursor", "not-allowed")
})
