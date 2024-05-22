import process from 'process'
import { resolve } from 'path'

export const isCLICall = (filename = '') => {
    const fname = resolve(filename)
    const pathPassedToNode = process.argv?.[1] ? resolve(process.argv?.[1]) : ''
    const isThisFileBeingRunViaCLI = pathPassedToNode.includes(fname)
    return isThisFileBeingRunViaCLI;
}
