
import { Resource } from "@well-known-components/http-server";
import { Inject } from "jeringa";
import { RequestAuthenticationContext } from "./resource-decorators";
import { AuthenticationContext } from "../../types";

@Inject
@Resource.Prefix('/private')
export class PrivateResource extends Resource {
  /**
   * Responds with the user information if the auth header is correct.
   */
  @Resource.Handler('GET', '/ping')
  async authenticatedPing(
    @RequestAuthenticationContext authContext: AuthenticationContext
  ) {
    return {
      body: authContext
    }
  }
}
