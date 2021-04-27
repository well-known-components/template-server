import { main } from "../../src/service"
import { createConfigComponent } from "@well-known-components/env-config-provider"
import { createTestServerComponent, IFetchComponent } from "@well-known-components/http-server"
import { createLogComponent } from "@well-known-components/logger"
import { GlobalContext, TestComponents } from "../../src/types"
import { metricDeclarations } from "../../src/metrics"
import { createTestMetricsComponent } from "@well-known-components/metrics"
import { createRunner } from "@well-known-components/test-helpers"

// creates a "mocha-like" describe function to run tests using the test components
export const testMock = createRunner({
  main,
  initComponents,
})

async function initComponents(): Promise<TestComponents> {
  const logs = createLogComponent()

  const config = createConfigComponent({})

  const server = createTestServerComponent<GlobalContext>()

  const fetch: IFetchComponent = server

  const metrics = createTestMetricsComponent(metricDeclarations)

  return { logs, config, server, fetch, metrics }
}
