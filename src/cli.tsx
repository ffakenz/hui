#!/usr/bin/env node

import React from "react"
import { render } from "ink"
import App from "./ui/ui"
import { options } from "./ui/options"
import WebSocket from 'ws'

const ws = new WebSocket(`ws://${options.hydraNodeHost.hostname}:${options.hydraNodeHost.port}`)

render(<App options={options} ws={ws} />)