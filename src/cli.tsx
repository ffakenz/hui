#!/usr/bin/env node

import React from "react"
import { render } from "ink"
import App from "./ui/ui"
import { options } from "./ui/options"


render(<App options={options} />)