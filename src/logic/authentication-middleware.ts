/**
 * This file may be a library on its own. It is recommended that if you are
 * creating microservices, you may extract this logic to a package that can
 * be reused across servers.
 */

import { IHttpServerComponent as h } from "@well-known-components/interfaces"

export type TokenBasedAuthData<T> = {
  bearerToken: string
  authData: T
}

export function basicAuthenticationMiddleware<Ctx extends { authenticationData?: TokenBasedAuthData<T> }, T = {}>(
  getUser: (context: Ctx, bearerToken: string) => Promise<T | null>
): h.IRequestHandler<Ctx> {
  return async (ctx, next) => {
    const auth = ctx.request.headers.get("authorization")

    // mising auth header
    if (!auth) return { status: 401 }

    const bearerTokenMatch = /^[Bb]earer\s+(.+)$/.exec(auth)

    // invalid bearer token
    if (!bearerTokenMatch) return { status: 401 }

    const bearerToken = bearerTokenMatch[1]

    const authData = await getUser(ctx, bearerToken)

    // invalid authData
    if (!authData) return { status: 401 }

    ctx.authenticationData = {
      bearerToken,
      authData,
    }

    return next()
  }
}
