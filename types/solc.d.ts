declare module 'solc' {
    interface CompilationResult<T> {
        contracts: Record<T, CompiledContract>
    }
    interface OpCode {
        begin: number,
        end: number,
        name: string,
        value?: string
    }
    export interface CompiledContract {
        assembly: {
            '.code': Array<OpCode>
            '.data': {
                [key: string]: {
                    '.auxdata': string
                    '.code': Array<OpCode>
                }
            }
        }
        bytecode: string
        functionHashes: Record<string, string>
        gasEstimates: {
            creation: Array<number | null>,
            external: Record<string, null>
            internal: unknown
        }
        interface: string
        metadata: string
        opcodes: string
        runtimeBytecode: string
        srcmap: string
        srcmapRuntime: string
    }
    export function compile<T>(sourceCode: string, something: number): CompilationResult<T>
}