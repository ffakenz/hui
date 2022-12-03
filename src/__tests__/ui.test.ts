import { render } from "ink-testing-library"
import { TextColor } from "r3bl-ts-utils"
import React from "react"
import App from "../ui/ui"
import { options } from "../ui/options"
import WebSocket from 'ws'

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
    const ws = new WebSocket(`ws://${options.hydraNodeHost.hostname}:${options.hydraNodeHost.port}`)
    const instance = render(React.createElement(App, { options, ws }))
    const { lastFrame } = instance
    expect(lastFrame()).toContain(TextColor.builder.red.build()("Disconnected"))
  })
})