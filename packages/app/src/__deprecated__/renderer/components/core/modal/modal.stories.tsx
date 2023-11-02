import * as React from "react"
import Modal from "App/__deprecated__/renderer/components/core/modal/modal.component"
import { StoryModalWrapper } from "App/__deprecated__/renderer/components/core/modal/modal.styled.elements"
import { noop } from "App/__deprecated__/renderer/utils/noop"
import {
  ModalSize,
  TitleOrder,
} from "App/__deprecated__/renderer/components/core/modal/modal.interface"
import Story from "App/__deprecated__/renderer/components/storybook/story.component"
import StoryContainer from "App/__deprecated__/renderer/components/storybook/story-container.component"
import { css } from "styled-components"
import Text, {
  TextDisplayStyle,
} from "App/__deprecated__/renderer/components/core/text/text.component"

const storyContainerStyle = css`
  align-items: flex-start;
`

export default {
  title: "Components|Core/Modal",
}

export const DefaultLarge = () => {
  return (
    <>
      <StoryContainer title="Types" customStyle={storyContainerStyle} column>
        <Story title="With title" transparentMode>
          <StoryModalWrapper>
            <Modal title={"Title"}>
              <Text displayStyle={TextDisplayStyle.Paragraph1}>
                Lorem ipsum dolor sit amet
              </Text>
            </Modal>
          </StoryModalWrapper>
        </Story>
        <Story title="With title and subtitle" transparentMode>
          <StoryModalWrapper>
            <Modal title={"Title"} subtitle={"Subtitle"}>
              <Text displayStyle={TextDisplayStyle.Paragraph1}>
                Lorem ipsum dolor sit amet
              </Text>
            </Modal>
          </StoryModalWrapper>
        </Story>
        <Story title="With titles reversed" transparentMode>
          <StoryModalWrapper>
            <Modal
              title={"Title"}
              subtitle={"Subtitle"}
              titleOrder={TitleOrder.SubtitleFirst}
            >
              <Text displayStyle={TextDisplayStyle.Paragraph1}>
                Lorem ipsum dolor sit amet
              </Text>
            </Modal>
          </StoryModalWrapper>
        </Story>
        <Story title="With action button" transparentMode>
          <StoryModalWrapper>
            <Modal
              title={"Title"}
              subtitle={"Subtitle"}
              actionButtonLabel={"Done"}
              onActionButtonClick={noop}
            >
              <Text displayStyle={TextDisplayStyle.Paragraph1}>
                Lorem ipsum dolor sit amet
              </Text>
            </Modal>
          </StoryModalWrapper>
        </Story>
      </StoryContainer>
    </>
  )
}

DefaultLarge.story = {
  name: "Default (large)",
}

export const _Medium = () => {
  return (
    <>
      <StoryContainer title="Types" customStyle={storyContainerStyle} column>
        <Story title="With title" transparentMode>
          <StoryModalWrapper>
            <Modal size={ModalSize.Medium} title={"Title"}>
              <Text displayStyle={TextDisplayStyle.Paragraph1}>
                Lorem ipsum dolor sit amet
              </Text>
            </Modal>
          </StoryModalWrapper>
        </Story>
        <Story title="With title and subtitle" transparentMode>
          <StoryModalWrapper>
            <Modal
              size={ModalSize.Medium}
              title={"Title"}
              subtitle={"Subtitle"}
            >
              <Text displayStyle={TextDisplayStyle.Paragraph1}>
                Lorem ipsum dolor sit amet
              </Text>
            </Modal>
          </StoryModalWrapper>
        </Story>
        <Story title="With titles reversed" transparentMode>
          <StoryModalWrapper>
            <Modal
              size={ModalSize.Medium}
              title={"Title"}
              subtitle={"Subtitle"}
              titleOrder={TitleOrder.SubtitleFirst}
            >
              <Text displayStyle={TextDisplayStyle.Paragraph1}>
                Lorem ipsum dolor sit amet
              </Text>
            </Modal>
          </StoryModalWrapper>
        </Story>
        <Story title="With action button" transparentMode>
          <StoryModalWrapper>
            <Modal
              size={ModalSize.Medium}
              title={"Title"}
              subtitle={"Subtitle"}
              actionButtonLabel={"Done"}
              onActionButtonClick={noop}
            >
              <Text displayStyle={TextDisplayStyle.Paragraph1}>
                Lorem ipsum dolor sit amet
              </Text>
            </Modal>
          </StoryModalWrapper>
        </Story>
      </StoryContainer>
    </>
  )
}

export const _Small = () => {
  return (
    <>
      <StoryContainer title="Types" customStyle={storyContainerStyle} column>
        <Story title="With title" transparentMode>
          <StoryModalWrapper>
            <Modal size={ModalSize.Small} title={"Title"}>
              <Text displayStyle={TextDisplayStyle.Paragraph1}>
                Lorem ipsum dolor sit amet
              </Text>
            </Modal>
          </StoryModalWrapper>
        </Story>
        <Story title="With title and subtitle" transparentMode>
          <StoryModalWrapper>
            <Modal size={ModalSize.Small} title={"Title"} subtitle={"Subtitle"}>
              <Text displayStyle={TextDisplayStyle.Paragraph1}>
                Lorem ipsum dolor sit amet
              </Text>
            </Modal>
          </StoryModalWrapper>
        </Story>
        <Story title="With titles reversed" transparentMode>
          <StoryModalWrapper>
            <Modal
              size={ModalSize.Small}
              title={"Title"}
              subtitle={"Subtitle"}
              titleOrder={TitleOrder.SubtitleFirst}
            >
              <Text displayStyle={TextDisplayStyle.Paragraph1}>
                Lorem ipsum dolor sit amet
              </Text>
            </Modal>
          </StoryModalWrapper>
        </Story>
        <Story title="With action button" transparentMode>
          <StoryModalWrapper>
            <Modal
              size={ModalSize.Small}
              title={"Title"}
              subtitle={"Subtitle"}
              actionButtonLabel={"Done"}
              onActionButtonClick={noop}
            >
              <Text displayStyle={TextDisplayStyle.Paragraph1}>
                Lorem ipsum dolor sit amet
              </Text>
            </Modal>
          </StoryModalWrapper>
        </Story>
      </StoryContainer>
    </>
  )
}

export const _VerySmall = () => {
  return (
    <>
      <StoryContainer title="Types" customStyle={storyContainerStyle} column>
        <Story title="With title" transparentMode>
          <StoryModalWrapper>
            <Modal size={ModalSize.VerySmall} title={"Title"}>
              <Text displayStyle={TextDisplayStyle.Paragraph1}>
                Lorem ipsum dolor sit amet
              </Text>
            </Modal>
          </StoryModalWrapper>
        </Story>
        <Story title="With title and subtitle" transparentMode>
          <StoryModalWrapper>
            <Modal
              size={ModalSize.VerySmall}
              title={"Title"}
              subtitle={"Subtitle"}
            >
              <Text displayStyle={TextDisplayStyle.Paragraph1}>
                Lorem ipsum dolor sit amet
              </Text>
            </Modal>
          </StoryModalWrapper>
        </Story>
        <Story title="With titles reversed" transparentMode>
          <StoryModalWrapper>
            <Modal
              size={ModalSize.VerySmall}
              title={"Title"}
              subtitle={"Subtitle"}
              titleOrder={TitleOrder.SubtitleFirst}
            >
              <Text displayStyle={TextDisplayStyle.Paragraph1}>
                Lorem ipsum dolor sit amet
              </Text>
            </Modal>
          </StoryModalWrapper>
        </Story>
        <Story title="With action button" transparentMode>
          <StoryModalWrapper>
            <Modal
              size={ModalSize.VerySmall}
              title={"Title"}
              subtitle={"Subtitle"}
              actionButtonLabel={"Done"}
              onActionButtonClick={noop}
            >
              <Text displayStyle={TextDisplayStyle.Paragraph1}>
                Lorem ipsum dolor sit amet
              </Text>
            </Modal>
          </StoryModalWrapper>
        </Story>
      </StoryContainer>
    </>
  )
}

_VerySmall.story = {
  name: "Very small",
}
