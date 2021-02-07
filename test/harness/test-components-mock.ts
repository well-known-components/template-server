import { main } from "../../src/service"
import { createConfigComponent } from "@well-known-components/env-config-provider"
import { createTestServerComponent, IFetchComponent } from "@well-known-components/http-server"
import { createLogComponent } from "@well-known-components/logger"
import { createE2ERunner, TestComponents } from "./test-helper"

// creates a "mocha-like" describe function to run tests using the test components
export const describeTestE2E = createE2ERunner({
  main: main as any,
  initComponents,
})

async function initComponents<C extends object>(): Promise<TestComponents<C>> {
  const logs = createLogComponent()

  const config = createConfigComponent({})

  const server = createTestServerComponent<C>()

  const fetch: IFetchComponent = server

  return { logs, config, server, fetch }
}
