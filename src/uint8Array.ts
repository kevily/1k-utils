export function uint8ArrayToBase64(uint8Array: Uint8Array, chunkSize = 10000) {
    const textFlow: string[] = []
    for (let i = 0; i < uint8Array.length; i += chunkSize) {
        const chunk = uint8Array.subarray(i, i + chunkSize)
        const string = String.fromCharCode.apply(null, chunk as never)
        textFlow.push(string)
    }
    return globalThis.btoa(textFlow.join(''))
}
