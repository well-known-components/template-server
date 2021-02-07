import type {
  IConfigComponent,
  ILoggerComponent,
  IHttpServerComponent,
  IBaseComponent,
} from "@well-known-components/interfaces"

export type GlobalContext = {
  components: AppComponents
}

export type AppComponents = {
  config: IConfigComponent
  logs: ILoggerComponent
  server: IHttpServerComponent<GlobalContext>
  statusChecks: IBaseComponent
}
