import React, { Dispatch, SetStateAction } from "react"
import { FunctionComponent } from "Renderer/types/function-component.interface"
import TetheringEnabled from "Renderer/modules/tethering/screens/tethering-enabled.component"
import PureDisconnected from "Renderer/modules/tethering/screens/pure-disconnected.component"
import TetheringDisabled from "Renderer/modules/tethering/screens/tethering-disabled.component"

interface TetheringProps {
  disconnectedDevice?: boolean
  tetheringEnabled?: boolean
  onToggleTethering?: Dispatch<SetStateAction<boolean>>
}

const TetheringUI: FunctionComponent<TetheringProps> = ({
  disconnectedDevice,
  tetheringEnabled,
  onToggleTethering,
}) => (
  <>
    {disconnectedDevice ? (
      <PureDisconnected />
    ) : tetheringEnabled ? (
      <TetheringEnabled
        tetheringEnabled={tetheringEnabled}
        onToggleTethering={onToggleTethering}
      />
    ) : (
      <TetheringDisabled
        tetheringEnabled={tetheringEnabled}
        onToggleTethering={onToggleTethering}
      />
    )}
  </>
)

export default TetheringUI
