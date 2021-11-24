/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { connect } from "react-redux"
import { ReduxRootState, RootState, TmpDispatch } from "Renderer/store"
import CollectingDataModal from "Renderer/modules/settings/components/collecting-data-modal/collecting-data-modal.component"
import { toggleCollectingDataModalShow } from "App/global-modals-manager/actions"
import { collectingDataModalShowSelector } from "App/global-modals-manager/selectors"

const mapStateToProps = (state: RootState & ReduxRootState) => {
  return {
    collectingDataModalShow: collectingDataModalShowSelector(state),
  }
}

const mapDispatchToProps = (dispatch: TmpDispatch) => ({
  toggleCollectingDataModalShow: (flag: boolean) =>
    dispatch(toggleCollectingDataModalShow(flag)),

  // TODO refactor legacy staff
  toggleAppCollectingData: dispatch.settings.toggleAppCollectingData,
})

export default connect(mapStateToProps, mapDispatchToProps)(CollectingDataModal)
