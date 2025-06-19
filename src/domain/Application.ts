
import { AppComponents, GlobalContext } from '../types'
import { Lifecycle } from '@well-known-components/interfaces'
import { Inject, InjectByName } from 'jeringa'
import { PingResource } from './resources/PingResource'
import { Router } from '@well-known-components/http-server'

@Inject
export class Application {
  readonly logger = this.components.logs.getLogger(this.constructor.name)

  readonly globalContext: GlobalContext = {
    components: this.components,
  }

  constructor(
    // HTTP Resources
    readonly pingResource: PingResource,

    // other components
    @InjectByName('components') readonly components: AppComponents,
    @InjectByName('program') readonly program: Lifecycle.EntryPointParameters<any>
  ) { }

  async start() {
    // 1st, we need to wire the program. all handlers, reporters, loggers must be
    // configured at this stage.
    await this.configureHttpServer()
    // 2nd start stateful components: db, listeners, synchronizations, connections, etc
    await this.program.startComponents()
  }

  async configureHttpServer() {
    const { server } = this.components

    // wire the HTTP router (make it automatic? TBD)
    const router = new Router<GlobalContext>()
    
    // register resources
    this.pingResource.registerResource(router)

    // register routes middleware
    server.use(router.middleware())
    // register not implemented/method not allowed/cors responses middleware
    server.use(router.allowedMethods())
    // set the context to be passed to the handlers
    server.setContext(this.globalContext)
  }

  async beforeStopComponents(): Promise<void> {
    // TODO: run code here before starting shutting down components
  }
}