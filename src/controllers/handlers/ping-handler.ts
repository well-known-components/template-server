import { HandlerContextWithPath } from "../../types"

// handlers arguments only type what they need, to make unit testing easier
export async function pingHandler(
  context: Pick<
    HandlerContextWithPath<"metrics", "/ping", "authenticationData">,
    "url" | "components" | "authenticationData"
  >
) {
  const {
    url,
    components: { metrics },
  } = context

  metrics.increment("test_ping_counter", {
    pathname: url.pathname,
  })

  if (context.authenticationData) {
    return { body: context.authenticationData.authData.name }
  }

  return {
    body: url.pathname,
  }
}
