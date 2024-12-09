import { gzip } from 'pako'
import { uint8ArrayToBase64 } from './uint8Array'

export function gzipCompress(data: string, resultType: 'base64'): string
export function gzipCompress(data: string, resultType: 'Uint8Array'): Uint8Array
export function gzipCompress(data: string, resultType: 'base64' | 'Uint8Array') {
    const uint8ArrayResult = gzip(data)
    if (resultType === 'base64') {
        return uint8ArrayToBase64(uint8ArrayResult)
    }
    return uint8ArrayResult
}
