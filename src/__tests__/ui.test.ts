import { render } from "ink-testing-library"
import { TextColor } from "r3bl-ts-utils"
import React from "react"
import App from "../ui/ui"

describe("my test suite", () => {
  test("a spec with an expectation", () => {
    expect(true).toBe(true)
  })

  test("another spec with a different expectation", () => {
    expect(false).toBe(false)
  })
})

describe("ink test suite", () => {
  test("render disconnected state", () => {
    const nodeHost = { hostname: "hostname", port: 8080 }
    const now = { time: Date.now() }
    const state = { nodeHost, now }

    const instance = render(React.createElement(App, { state }))
    const { lastFrame } = instance
    expect(lastFrame()).toContain(TextColor.builder.red.build()("Disconnected"))
  })
})