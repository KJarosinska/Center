import React from "react"
import MeditationStats from "App/__deprecated__/renderer/components/rest/meditation/stats/meditation-stats.component"
import Story from "App/__deprecated__/renderer/components/storybook/story.component"
import {
  generateMeditationData,
  statsWeekly,
} from "App/__mocks__/meditation-stats.mock"
import { ChartType } from "App/__deprecated__/renderer/components/rest/meditation/stats/meditation-stats.enum"

export default {
  title: "Components/Rest/Meditation",
}

export const Stats = () => {
  return (
    <>
      <Story title="Weekly">
        <MeditationStats
          chartType={ChartType.Weekly}
          statsData={generateMeditationData()}
        />
      </Story>
      <Story title="Monthly">
        <MeditationStats
          chartType={ChartType.Monthly}
          statsData={generateMeditationData(ChartType.Monthly)}
        />
      </Story>
      <Story title="Yearly">
        <MeditationStats
          chartType={ChartType.Yearly}
          statsData={generateMeditationData(ChartType.Yearly)}
        />
      </Story>
      <Story title="No Data">
        <MeditationStats chartType={ChartType.Weekly} statsData={statsWeekly} />
      </Story>
    </>
  )
}
