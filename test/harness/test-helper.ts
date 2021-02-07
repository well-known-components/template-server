import { IFetchComponent } from "@well-known-components/http-server/dist/test-component"
import { IConfigComponent, IHttpServerComponent, ILoggerComponent, Lifecycle } from "@well-known-components/interfaces"

export type TestComponents<C extends object> = {
  server: IHttpServerComponent<C> & { resetMiddlewares(): void }
  logs: ILoggerComponent
  config: IConfigComponent
  fetch: IFetchComponent
}

export type RunnerOptions<Components> = {
  main: (components: Components) => Promise<any>
  initComponents: () => Promise<Components>
}

export const createE2ERunner = (options: RunnerOptions<TestComponents<any>>) => {
  return <C extends object>(name: string, suite: (getComponents: () => TestComponents<C>) => void) => {
    describe(name, () => {
      let program: Lifecycle.ComponentBasedProgram<TestComponents<C>>

      before(async () => {
        program = await Lifecycle.programEntryPoint<TestComponents<C>>(options)
      })

      function getComponents() {
        if (!program) throw new Error("Cannot get the components before the test program is initialized")
        const c = program.components
        if (!c) throw new Error("Cannot get the components")
        return c
      }

      suite(getComponents)

      after(async () => {
        if (program) {
          await program.stop()
        }
      })
    })
  }
}
