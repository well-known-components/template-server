import { Router } from "@well-known-components/http-server"
import { GlobalContext } from "../types"
import { pingHandler } from "./handlers/ping-handler"

// We return the entire router because it will be easier to test than a whole server
export async function setupRouter(globalContext: GlobalContext): Promise<Router<GlobalContext>> {
  const router = new Router<GlobalContext>()

  router.get("/ping", pingHandler)

  return router
}
