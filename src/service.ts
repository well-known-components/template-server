import { setupRouter } from "./controllers/routes"
import { BaseComponents, GlobalContext } from "./types"

export async function main(components: BaseComponents) {
  const globalContext: GlobalContext = {
    components,
  }

  // wire the HTTP router (make it automatic? TBD)
  const router = await setupRouter(globalContext)
  components.server.use(router.middleware())
}
