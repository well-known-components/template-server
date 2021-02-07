import expect from "expect"
import { pingHandler } from "../../src/controllers/handlers/ping-handler"

describe("ping-controller-unit", () => {
  it("must return the pathname of a URL", async () => {
    const url = new URL("https://github.com/well-known-components")
    expect(await pingHandler({ url })).toEqual({ body: url.pathname })
  })
})
