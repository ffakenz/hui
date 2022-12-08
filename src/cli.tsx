#!/usr/bin/env node

import React from "react"
import { render } from "ink"
import App from "./ui/app"
import { options } from "./ui/options"
import HydraSocketProvider from "./ui/hydra-ws/provider"

render(
    <HydraSocketProvider>
        {/* the actual app */}
        <App options={options} />
    </HydraSocketProvider>
)