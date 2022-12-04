import { _let } from "r3bl-ts-utils"
import { Command } from "commander"
import { Host } from "./model/types"

export type FilePath = string
export type NetworkId = number

export interface Options {
    hydraNodeHost: Host
    cardanoNodeSocket: FilePath
    cardanoNetworkId: NetworkId
    cardanoSigningKey: FilePath
}

const hydraNodeHost: Host = _let(new Command(), (command) => {
    command.option(
        "-c, --connect <connect>",
        "Hydra-node to connect to in the form of <host>:<port>",
        "0.0.0.0:4001"
    )
    command.parse(process.argv)
    const options = command.opts()
    const connect = options["connect"] as string
    const hostname = connect.split(':')[0] as string
    const port = connect.split(':')[1] as string
    const portNumber = parseInt(port)
    return { hostname: hostname, port: portNumber } as Host
})

const cardanoNodeSocket: FilePath = _let(new Command(), (command) => {
    command.option(
        "--node-socket <node-socket>",
        "The path to the Cardano node domain socket for client communication.",
        "node.socket"
    )
    command.parse(process.argv)
    const options = command.opts()
    return options["node-socket"] as FilePath
})

const cardanoNetworkId: NetworkId = _let(new Command(), (command) => {
    command.option(
        "-n, --network-id <network-id>",
        "The network magic number identifying the testnet to connect to.",
        "42"
    )
    command.parse(process.argv)
    const options = command.opts()
    return options["network-id"] as NetworkId
})

const cardanoSigningKey: FilePath = _let(new Command(), (command) => {
    command.option(
        "-k, --cardano-signing-key <cardano-signing-key>",
        "The path to the signing key file used for selecting, committing  UTxO and signing off-chain transactions. This file used the same 'Envelope' format than cardano-cli.",
        "me.sk"
    )
    command.parse(process.argv)
    const options = command.opts()
    return options["cardano-signing-key"] as FilePath
})

export const options: Options = {
    hydraNodeHost,
    cardanoNodeSocket,
    cardanoNetworkId,
    cardanoSigningKey
}