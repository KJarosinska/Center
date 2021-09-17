/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { connect } from "react-redux"
import { RootModel } from "Renderer/models/models"
import AudioConversion from "Renderer/modules/settings/tabs/audio-conversion/audio-conversion.component"

const mapStateToProps = (state: RootModel) => {
  return state.settings
}

// TODO replace any with legit `Dispatch`
const mapDispatchToProps = (dispatch: any) => dispatch.settings

export default connect(mapStateToProps, mapDispatchToProps)(AudioConversion)
