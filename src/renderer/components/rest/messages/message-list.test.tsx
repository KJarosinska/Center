// import { renderWithThemeAndIntl } from "Renderer/utils/render-with-theme-and-intl"
// import React from "react"
// import MessagesList from "Renderer/components/rest/messages/messages-list.component"
// // import { fireEvent } from "@testing-library/dom"
// import "@testing-library/jest-dom/extend-expect"
// import { mockAllIsIntersecting } from "react-intersection-observer/test-utils"
// import { intl } from "Renderer/utils/intl"
// import { mockedList } from "./__mocks__/caller-data"
//
// const renderer = () => {
//   const getRowStatus = jest.fn()
//   const toggleRow = jest.fn()
//   const props = {
//     noneRowsSelected: true,
//     getRowStatus,
//     toggleRow,
//   }
//
//   return renderWithThemeAndIntl(<MessagesList list={mockedList} {...props} />)
// }

// test("when at least one checkbox is checked, all checkboxes are visible", () => {
//   const { getAllByTestId } = renderer()
//   mockAllIsIntersecting(true)
//   const checkboxes = getAllByTestId("checkbox")
//   checkboxes.forEach(checkbox => expect(checkbox).not.toBeVisible())
//   fireEvent.click(checkboxes[0])
//   checkboxes.forEach(checkbox => expect(checkbox).toBeVisible())
// })

// test("dropdown call button has correct content", () => {
//   const { getAllByTestId } = renderer()
//   mockAllIsIntersecting(true)
//   expect(getAllByTestId("dropdown-call")[0]).toHaveTextContent(
//     intl.formatMessage(
//       {
//         id: "view.name.messages.dropdownCall",
//       },
//       { name: mockedList[0].caller.firstName }
//     )
//   )
// })
//
// test("displays correct amount of dropdown call buttons", () => {
//   const { getAllByTestId } = renderer()
//   mockAllIsIntersecting(true)
//   expect(getAllByTestId("dropdown-call")).toHaveLength(mockedList.length)
// })
//
// test("dropdown contact details button has correct content", () => {
//   const { getAllByTestId } = renderer()
//   mockAllIsIntersecting(true)
//   expect(getAllByTestId("dropdown-contact-details")[0]).toHaveTextContent(
//     intl.formatMessage({
//       id: "view.name.messages.dropdownContactDetails",
//     })
//   )
// })
//
// test("displays correct amount of dropdown contact details buttons for contacts", () => {
//   const { getAllByTestId } = renderer()
//   mockAllIsIntersecting(true)
//   expect(getAllByTestId("dropdown-contact-details")).toHaveLength(2)
// })
//
// test("displays correct amount of dropdown add to contacts buttons for person that is unknown", () => {
//   const { getAllByTestId } = renderer()
//   mockAllIsIntersecting(true)
//   expect(getAllByTestId("dropdown-add-to-contacts")).toHaveLength(1)
// })
//
// test("dropdown mark as read button has correct content ", () => {
//   const { getAllByTestId } = renderer()
//   mockAllIsIntersecting(true)
//   expect(getAllByTestId("dropdown-mark-as-read")[0]).toHaveTextContent(
//     intl.formatMessage({
//       id: "view.name.messages.dropdownMarkAsRead",
//     })
//   )
// })
//
// test("displays correct amount of dropdown mark as read buttons", () => {
//   const { getAllByTestId } = renderer()
//   mockAllIsIntersecting(true)
//   expect(getAllByTestId("dropdown-mark-as-read")).toHaveLength(
//     mockedList.length
//   )
// })
//
// test("dropdown delete button has correct content", () => {
//   const { getAllByTestId } = renderer()
//   mockAllIsIntersecting(true)
//   expect(getAllByTestId("dropdown-delete")[0]).toHaveTextContent(
//     intl.formatMessage({
//       id: "view.name.messages.dropdownDelete",
//     })
//   )
// })
//
// test("displays correct amount of dropdown delete buttons", () => {
//   const { getAllByTestId } = renderer()
//   mockAllIsIntersecting(true)
//   expect(getAllByTestId("dropdown-delete")).toHaveLength(mockedList.length)
// })
