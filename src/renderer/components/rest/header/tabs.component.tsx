import * as React from "react"
import Tab from "Renderer/components/rest/header/tab.component"
import { tabElements } from "Renderer/constants/tab-elements"
import FunctionComponent from "Renderer/types/function-component.interface"
import styled from "styled-components"

const TabsWrapper = styled.div`
  display: flex;
`

const NavTab = styled(Tab)`
  &:not(:last-child) {
    margin-right: 4rem;
  }
`

interface Props {
  currentLocation?: string
}

const Tabs: FunctionComponent<Props> = ({ className, currentLocation }) => {
  const currentLocationTabs = tabElements.filter(({ parentUrl, tabs }) =>
    currentLocation?.includes(parentUrl)
  )[0]

  const tabsList = currentLocationTabs?.tabs.map(({ label, icon, url }) => (
    <NavTab label={label} icon={icon} key={label.id} url={url} />
  ))

  return <TabsWrapper className={className}>{tabsList}</TabsWrapper>
}

export default Tabs
