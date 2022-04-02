import type { IFetchComponent } from "@well-known-components/http-server"
import type {
  IConfigComponent,
  ILoggerComponent,
  IHttpServerComponent,
  IBaseComponent,
  IMetricsComponent,
} from "@well-known-components/interfaces"
import { UserData } from "./logic/getUser"
import { TokenBasedAuthData } from "./logic/authentication-middleware"
import { metricDeclarations } from "./metrics"

export type GlobalContext = {
  components: BaseComponents
  authenticationData?: TokenBasedAuthData<UserData>
}

// components used in every environment
export type BaseComponents = {
  config: IConfigComponent
  logs: ILoggerComponent
  server: IHttpServerComponent<GlobalContext>
  fetch: IFetchComponent
  metrics: IMetricsComponent<keyof typeof metricDeclarations>
}

// components used in runtime
export type AppComponents = BaseComponents & {
  statusChecks: IBaseComponent
}

// components used in tests
export type TestComponents = BaseComponents & {
  // A fetch component that only hits the test server
  localFetch: IFetchComponent
}

// this type simplifies the typings of http handlers
export type HandlerContextWithPath<
  ComponentNames extends keyof AppComponents,
  Path extends string = any,
  GlobalContextKeys extends keyof GlobalContext = any
> = IHttpServerComponent.PathAwareContext<
  IHttpServerComponent.DefaultContext<{
    components: Pick<AppComponents, ComponentNames>
  }>,
  Path
> &
  Omit<Pick<GlobalContext, GlobalContextKeys>, "components">

export type PickComponents<ComponentNames extends keyof AppComponents, Ctx = {}> = Ctx & {
  components: Pick<AppComponents, ComponentNames>
}

export type Context<Path extends string = any> = IHttpServerComponent.PathAwareContext<GlobalContext, Path>
