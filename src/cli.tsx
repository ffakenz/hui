#!/usr/bin/env node

import React from "react"
import { render } from "ink"
import App from "./ui/ui"
import { _let } from "r3bl-ts-utils"
import { Command } from "commander"

const hostname: string = _let(new Command(), (command) => {
  command.option("-h, --hostname <hostname>", "hostname to display")
  command.parse(process.argv)
  const options = command.opts()
  return options["hostname"] as string
})

const nodeHost = { hostname, port: 8080 }
const now = { time: Date.now() }
const disconnected = { nodeHost, now }

render(<App state={disconnected} />)