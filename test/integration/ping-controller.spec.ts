import { test } from "../components"

test("integration sanity tests using a real server backend", function ({ components, stubComponents }) {
  it("responds /ping", async () => {
    const { localFetch } = components

    const r = await localFetch.fetch("/ping")

    expect(r.status).toEqual(200)
    expect(await r.text()).toEqual("/ping")
  })

  it("calling /ping increments a metric", async () => {
    const { localFetch } = components
    const { metrics } = stubComponents

    const r = await localFetch.fetch("/ping")

    expect(r.status).toEqual(200)
    expect(await r.text()).toEqual("/ping")

    expect(metrics.increment.calledOnceWith("test_ping_counter", { pathname: "/ping" })).toEqual(true)
  })

  it("random url responds 404", async () => {
    const { localFetch } = components

    const r = await localFetch.fetch("/ping" + Math.random())

    expect(r.status).toEqual(404)
  })

  it("next call to /ping should fail in 'metrics' component", async () => {
    const { localFetch } = components
    const { metrics } = stubComponents

    metrics.increment.throwsException("some exception")

    const r = await localFetch.fetch("/ping")

    expect(r.status).toEqual(500)
  })
})