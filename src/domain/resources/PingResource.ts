import { Resource } from "@well-known-components/http-server";
import { Inject } from "jeringa";
import { IncrementMetricAction } from "../actions/IncrementMetricAction";
import { RequestUrl } from "./resource-decorators";

@Inject
export class PingResource extends Resource {
  constructor(
    // inject some actions to be used from this resource
    readonly incrementMetric: IncrementMetricAction
  ) { super() }

  @Resource.Handler('GET', '/ping')
  async ping(
    // refer to https://github.com/well-known-components/http-server/blob/main/test/resource.spec.ts for more examples
    // @Resource.RequestContext context: HttpContext
    @RequestUrl url: URL,
  ) {
    this.incrementMetric.run(url)

    return {
      body: url.pathname,
    }
  }

  /**
   * Responds with {"id":urlparams.id}
   */
  @Resource.Handler('GET', '/ping/:id')
  async pingById(
    @Resource.UrlParam('id') id: string
  ) {
    return {
      body: { id }
    }
  }
}
