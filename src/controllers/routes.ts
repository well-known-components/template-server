import { Router } from "@well-known-components/http-server"
import { compose } from "@well-known-components/http-server/dist/middleware"
import { basicAuthenticationMiddleware } from "../logic/authentication-middleware"
import { GlobalContext } from "../types"
import { getUserFromToken } from "../logic/getUser"
import { pingHandler } from "./handlers/ping-handler"

// We return the entire router because it will be easier to test than a whole server
export async function setupRouter(globalContext: GlobalContext): Promise<Router<GlobalContext>> {
  const router = new Router<GlobalContext>()

  router.get("/ping", pingHandler)

  router.get("/secure/ping", compose(basicAuthenticationMiddleware<GlobalContext>(getUserFromToken), pingHandler))

  return router
}
