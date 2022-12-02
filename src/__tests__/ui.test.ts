import { render } from "ink-testing-library"
import { TextColor } from "r3bl-ts-utils"
import React from "react"
import App from "../ui"

describe("my test suite", () => {
  test("a spec with an expectation", () => {
    expect(true).toBe(true)
  })

  test("another spec with a different expectation", () => {
    expect(false).toBe(false)
  })
})

describe("ink test suite", () => {
  test("greet unknown user", () => {
    const { lastFrame } = render(React.createElement(App, null))
    expect(lastFrame()).toContain(TextColor.builder.blue.build()("Initializing"))
  })

  test("greet user with a name", () => {
    const instance = render(React.createElement(App, { state: "Initializing" }))
    const { lastFrame } = instance
    expect(lastFrame()).toContain(TextColor.builder.blue.build()("Initializing"))
  })
})