import expect from "expect"
import { TestComponents } from "../../src/types"
import { test } from "../harness/test-components-http-server"
import { testMock } from "../harness/test-components-mock"

test("integration sanity tests using a real server backend", function ({ components, stubComponents }) {
  it("responds /ping", async () => {
    const { fetch } = components

    const r = await fetch.fetch("/ping")

    expect(r.status).toEqual(200)
    expect(await r.text()).toEqual("/ping")
  })

  it("calling /ping increments a metric", async () => {
    const { fetch } = components
    const { metrics } = stubComponents

    const r = await fetch.fetch("/ping")

    expect(r.status).toEqual(200)
    expect(await r.text()).toEqual("/ping")

    expect(metrics.increment.calledOnceWith("test_ping_counter", { pathname: "/ping" })).toEqual(true)
  })

  it("random url responds 404", async () => {
    const { fetch } = components

    const r = await fetch.fetch("/ping" + Math.random())

    expect(r.status).toEqual(404)
  })

  it("next call to /ping should fail in 'metrics' component", async () => {
    const { fetch } = components
    const { metrics } = stubComponents

    metrics.increment.throwsException("some exception")

    const r = await fetch.fetch("/ping")

    expect(r.status).toEqual(500)
  })
})

testMock("integration sanity tests using a mocked server backend (different components)", function ({ components }) {
  it("responds /ping", async () => {
    const { fetch } = components

    const r = await fetch.fetch("/ping")

    expect(r.status).toEqual(200)
    expect(await r.text()).toEqual("/ping")
  })
})
