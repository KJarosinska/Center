import { connect } from "react-redux"
import {
  Store as BasicInfoInitialState,
  SimCard,
} from "Renderer/models/basic-info/interfaces"
import Overview from "Renderer/modules/overview/overview.component"
import { select } from "Renderer/store"

const selection = select(models => ({
  networkName: models.basicInfo.activeSimNetworkName,
}))

const mapStateToProps = ({
  basicInfo,
}: {
  basicInfo: BasicInfoInitialState
}) => ({
  ...basicInfo,
  ...selection,
})

const mapDispatchToProps = (dispatch: any) => ({
  loadData: () => dispatch.basicInfo.loadData(),
  disconnectDevice: () => dispatch.basicInfo.disconnect(),
  changeSim: (card: SimCard) => dispatch.basicInfo.changeSim(card),
})

export default connect(mapStateToProps, mapDispatchToProps)(Overview)
