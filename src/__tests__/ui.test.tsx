import { render } from "ink-testing-library"
import { TextColor } from "r3bl-ts-utils"
import React from "react"
import App from "../ui/app"
import HydraSocketProvider from "../ui/hydra-ws/provider"
import { options } from "../ui/options"

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
    const instance = render(
      <HydraSocketProvider>
        <App options={options} />
      </HydraSocketProvider>
    );
    const { lastFrame } = instance
    expect(lastFrame()).toContain(TextColor.builder.red.build()("Disconnected"))
  })
})