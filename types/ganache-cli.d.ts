declare module 'ganache-cli' {
    export function provider(): import('web3-core').provider
}