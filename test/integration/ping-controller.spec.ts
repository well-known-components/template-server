import expect from "expect"
import { describeE2E } from "../harness/test-components-http-server"
import { describeTestE2E } from "../harness/test-components-mock"
import { TestComponents } from "../harness/test-helper"

describeE2E("integration sanity tests using a real server backend", integrationSuite)
describeTestE2E("integration sanity tests using mocked test server", integrationSuite)

function integrationSuite(getComponents: () => TestComponents<any>) {
  it("responds /ping", async () => {
    const { fetch } = getComponents()

    const r = await fetch.fetch("/ping")

    expect(r.status).toEqual(200)
    expect(await r.text()).toEqual("/ping")
  })

  it("random url responds 404", async () => {
    const { fetch } = getComponents()

    const r = await fetch.fetch("/ping" + Math.random())

    expect(r.status).toEqual(404)
  })
}
