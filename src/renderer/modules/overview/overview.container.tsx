import { connect } from "react-redux"
import { InitialState as BasicInfoInitialState } from "Renderer/models/basicInfo/interfaces"
import Overview from "Renderer/modules/overview/overview.component"

const mapStateToProps = ({
  basicInfo,
}: {
  basicInfo: BasicInfoInitialState
}) => ({
  ...basicInfo,
})

const mapDispatchToProps = (dispatch: any) => ({
  loadData: () => dispatch.basicInfo.loadData(),
})

export default connect(mapStateToProps, mapDispatchToProps)(Overview)
