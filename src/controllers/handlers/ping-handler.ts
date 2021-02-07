import { AppComponents } from "../../types"

// handlers arguments only type what they need, to make unit testing easier
export type PingComponents = Pick<AppComponents, "metrics">
export async function pingHandler(context: { url: URL; components: PingComponents }) {
  const {
    url,
    components: { metrics },
  } = context

  metrics.increment("test_ping_counter", {
    pathname: url.pathname,
  })

  return {
    body: url.pathname,
  }
}
