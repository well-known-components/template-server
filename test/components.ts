// This file is the "test-environment" analogous for src/components.ts
// Here we define the test components to be used in the testing environment

import nodeFetch, { RequestInfo, RequestInit } from "node-fetch"
import { createConfigComponent } from "@well-known-components/env-config-provider"
import { createServerComponent, IFetchComponent } from "@well-known-components/http-server"
import { createLogComponent } from "@well-known-components/logger"
import { createMetricsComponent } from "@well-known-components/metrics"
import { createRunner } from "@well-known-components/test-helpers"

import { main } from "../src/service"
import { GlobalContext, TestComponents } from "../src/types"
import { metricDeclarations } from "../src/metrics"
import { createFetchComponent } from "../src/ports/fetch"

// start TCP port for listeners
let lastUsedPort = 19000 + parseInt(process.env.JEST_WORKER_ID || '1') * 1000
function getFreePort(){
  return lastUsedPort + 1
}

/**
 * Behaves like Jest "describe" function, used to describe a test for a
 * use case, it creates a whole new program and components to run an
 * isolated test.
 *
 * State is persistent within the steps of the test.
 */
export const test = createRunner<TestComponents>({
  main,
  initComponents,
})

async function initComponents(): Promise<TestComponents> {
  const logs = createLogComponent()

  const currentPort = getFreePort()

  const config = createConfigComponent({
    HTTP_SERVER_PORT: (currentPort + 1).toString(),
    HTTP_SERVER_HOST: "0.0.0.0",
  })

  const protocolHostAndProtocol = `http://${await config.requireString(
    "HTTP_SERVER_HOST"
  )}:${await config.requireNumber("HTTP_SERVER_PORT")}`

  const server = await createServerComponent<GlobalContext>({ logs, config }, {})

  const fetch: IFetchComponent = await createFetchComponent()

  // test fetch, to hit our local server
  const localFetch: IFetchComponent = {
    async fetch(url: RequestInfo, initRequest?: RequestInit) {
      if (typeof url == "string" && url.startsWith("/")) {
        return nodeFetch(protocolHostAndProtocol + url, { ...initRequest })
      } else {
        return fetch.fetch(url, initRequest)
      }
    },
  }

  const metrics = await createMetricsComponent(metricDeclarations, { server, config })

  return { logs, config, server, fetch, metrics, localFetch }
}
