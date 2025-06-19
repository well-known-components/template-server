import { AsyncResourceParameterDecorator, defineParamExtractor  } from "@well-known-components/http-server"
import * as HttpErrors from 'http-errors'
import { AuthenticationContext } from "../../types"

/**
 * This parameter decorator extracts the URL from the context and returns it.
 */
export const RequestUrl: AsyncResourceParameterDecorator =
  (resourceInstance, method, paramIndex) => {
    defineParamExtractor(resourceInstance, method, paramIndex, async (ctx) => {
      return ctx.url
    })
  }

/**
 * This parameter decorator returns the JSON body from a request.
 */
export const RequestBody: AsyncResourceParameterDecorator =
  (resourceInstance, method, paramIndex) => {
    defineParamExtractor(resourceInstance, method, paramIndex, async (ctx) => {

      const reqBody = await ctx.request.json()

      // TODO: validate schema or `throw new HttpErrors.BadRequest()`

      return reqBody
    })
  }

/**
 * This parameter decorator mocks an authentication system and returns a fake authentication
 * context to illustrate how it works.
 */
export const RequestAuthenticationContext: AsyncResourceParameterDecorator =
  (resourceInstance, method, paramIndex) => {
    defineParamExtractor(resourceInstance, method, paramIndex, async (ctx) => {
      // we are validating the header here, but it is recommended that you do that in a specialized
      // middleware and inject the authentication information into the context. then, this extractor's
      // only responsibility would be to "extract" that information from the context and return it
      if (ctx.request.headers.get('Authorization') != 'Bearer 123') {
        throw new HttpErrors.Unauthorized()
      }

      return {
        user: 'menduz'
      } satisfies AuthenticationContext
    })
  }
