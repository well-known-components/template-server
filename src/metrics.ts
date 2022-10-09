import { IMetricsComponent } from "@well-known-components/interfaces"
import { getDefaultHttpMetrics, validateMetricsDeclaration } from "@well-known-components/metrics"
import { metricDeclarations as logsMetricsDeclarations } from "@well-known-components/logger"

export const metricDeclarations = {
  ...getDefaultHttpMetrics(),
  ...logsMetricsDeclarations,
  test_ping_counter: {
    help: "Count calls to ping",
    type: IMetricsComponent.CounterType,
    labelNames: ["pathname"],
  },
}

// type assertions
validateMetricsDeclaration(metricDeclarations)
