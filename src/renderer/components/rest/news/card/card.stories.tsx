import { storiesOf } from "@storybook/react"
import * as React from "react"
import Card from "Renderer/components/rest/news/card/card.component"
import styled from "styled-components"

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

storiesOf("Components|Card", module).add("Card", () => {
  return (
    <Container>
      <Card
        header={"Example header"}
        imageSource={"http://placekitten.com/g/300/400"}
        url={"www.google.pl"}
        content={
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. A, neque?"
        }
      />
    </Container>
  )
})
