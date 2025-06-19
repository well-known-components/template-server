import { test } from "../components"

test("tests the authenticated request", function ({ components, spyComponents }) {
  it("responds 401 /private/ping", async () => {
    const { localFetch } = components
    const r = await localFetch.fetch("/private/ping")

    expect(r.status).toEqual(401)
  })

  it("responds 200 with the correct authz header", async () => {
    const { localFetch } = components
    const r = await localFetch.fetch("/private/ping", {
      headers: {
        Authorization: "Bearer 123"
      }
    })

    expect(r.status).toEqual(200)
  })
})
